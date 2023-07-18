import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Project } from '../dtos/entities/project.entity';
import { GetInfo } from 'src/utils/common.utils';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/dtos/schema/user.schema';
import { Model } from 'mongoose';
import { FavProjects } from '../dtos/entities/favProjects.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ProjectService {
  constructor(
    private getInfo: GetInfo,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getProject(userId: string, projectId: string) {
    const { project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    return project;
  }

  async getParticipateProjects(userId: string) {
    const user = await this.getInfo.getUserId(userId);

    const userIds = user.participateProjects.map((projects) => projects.userId);
    const projectIds = user.participateProjects.map(
      (projects) => projects.projectId,
    );

    const users = await this.userModel.find({
      _id: { $in: userIds },
      'projects.id': { $in: projectIds },
    });

    const projects = users.flatMap((user) => {
      return user.projects.filter((project) => projectIds.includes(project.id));
    });

    return projects;
  }

  async createNewProject(project: Project) {
    const user = await this.getInfo.getUserId(project.userId);

    const newProject = {
      id: randomUUID(),
      titleProject: project.titleProject,
      userId: project.userId,
      dataAcesso: project.dataAcesso,
      participantes: project.participantes,
      colorProject: project.colorProject,
      cardTasks: [],
      finishedProject: false,
    };

    user.projects.push(newProject);

    await user.save();

    return newProject;
  }

  async updateUserFavProjects(userId: string, newFavProject: FavProjects) {
    const user = await this.getInfo.getUserId(userId);

    const existingFavProjectIndex = user.favProjects.findIndex(
      (project) => project.projectId === newFavProject.projectId,
    );

    if (existingFavProjectIndex !== -1) {
      user.favProjects.splice(existingFavProjectIndex, 1);
    } else {
      user.favProjects.push(newFavProject);
    }

    await user.save();

    return user.favProjects;
  }

  async finishedUserProject(userId: string, projectId: string) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    project.finishedProject = true;
    user.markModified('projects');

    await user.save();

    return project;
  }

  async deleteUserProject(userId: string, projectId: string) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    user.projects = user.projects.filter((project) => project.id !== projectId);

    await user.save();

    return project;
  }

  async leaveProject(userId: string, projectId: string) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    const projectParticipantes = project.participantes.filter(
      (participantes) => participantes !== userId,
    );
    user.markModified('projects');

    await user.save();

    return projectParticipantes;
  }

  async sendEmail(email: string, projectName: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'nexttask3@gmail.com',
        pass: '',
      },
    });

    const mailOptions = {
      from: 'nexttask3@gmail.com',
      to: email,
      subject: 'Project invitation',
      html: `
        <div style='text-align: center'>
          <img src="cid:logo" alt="Logo" />
          <p style='color: #2d333a'>
            You were invited to participate in project ${projectName},<br>
            to join the project follow the link below<br>
          </p>
          <br>
          <a href='http://localhost:3000/login' style='background-color: rgb(142, 78, 245); text-decoration: none; padding: 10px 20px; border-radius: 4px; color: white'>Enter the project</a>
          <br>
          <br>
          <p style='color: #2d333a'>
            NextTask projects help you put <br>
            your plans into practice and reach your goals!
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './logo.png',
          cid: 'logo',
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return 'Email sent successfully!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email.');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Project } from '../dtos/entities/project.entity';
import { GetInfo } from 'src/utils/common.utils';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/dtos/schema/user.schema';
import { Model } from 'mongoose';
import { FavProjects } from '../dtos/entities/favProjects.entity';

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
}

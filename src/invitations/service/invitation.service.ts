import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Invitation } from '../dtos/schema/invitation.schema';
import { GetInfo } from 'src/utils/common.utils';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/dtos/schema/user.schema';

@Injectable()
export class InvitationService {
  constructor(
    private getInfo: GetInfo,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Invitation.name) private InvitateModel: Model<Invitation>,
  ) {}

  async sendEmail(convite: Invitation) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      convite.userId,
      convite.projectId,
    );

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'nexttask3@gmail.com',
        pass: process.env.PASSWORD_APP,
      },
    });

    const mailOptions = {
      from: 'nexttask3@gmail.com',
      to: convite.email,
      subject: 'Project Invitation',
      html: `
            <div style='text-align: center'>
              <img src="cid:logo" alt="Logo" />
              <p style='color: #2d333a'>
                You have been invited to participate in project "${project.titleProject}" by ${user.username}.<br>
                To join the project, click the link below:<br>
              </p>
              <br>
              <a href='http://localhost:3000/login' style='background-color: rgb(142, 78, 245); text-decoration: none; padding: 10px 20px; border-radius: 4px; color: white'>Enter the project</a>
              <br>
              <br>
              <p style='color: #2d333a'>
                NextTask projects help you put<br>
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

      project.participantes.push(convite.email);
      user.markModified('projects');

      await user.save();

      const sendUser = await this.userModel.findOne({ email: convite.email });

      if (!sendUser) {
        const conviteInfo = {
          userId: convite.userId,
          projectId: convite.projectId,
          email: convite.email,
          createAt: new Date(),
          expiresAt: new Date(),
        };

        conviteInfo.expiresAt = new Date(conviteInfo.expiresAt);
        conviteInfo.expiresAt.setDate(conviteInfo.expiresAt.getDate() + 7);

        const invitation = new this.InvitateModel(conviteInfo);
        await invitation.save();
      }

      if (sendUser) {
        sendUser.participateProjects.push({
          userId: convite.userId,
          projectId: convite.projectId,
        });
        sendUser.markModified('user');

        await sendUser.save();
      }

      return 'Email sent successfully!';
    } catch (error) {
      throw new Error('Failed to send email.');
    }
  }
}

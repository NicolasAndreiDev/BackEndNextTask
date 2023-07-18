import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/dtos/schema/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetInfo {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUserId(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    return user;
  }

  async getUserIdAndProjectId(userdId: string, projectId: string) {
    const user = await this.getUserId(userdId);

    const project = user.projects.find((project) => project.id === projectId);

    if (!project) {
      throw new Error('Projeto não encontrado!');
    }

    return { user, project };
  }

  async getUserIdProjectIdAndCardId(
    userId: string,
    projectId: string,
    cardId: string,
  ) {
    const { user, project } = await this.getUserIdAndProjectId(
      userId,
      projectId,
    );

    const card = project.cardTasks.find((card) => card.id === cardId);

    if (!card) {
      throw new Error('Card não encontrado!');
    }

    return { user, project, card };
  }
}

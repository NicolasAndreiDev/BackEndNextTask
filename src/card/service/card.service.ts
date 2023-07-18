import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Card } from '../dtos/entities/card.entity';
import { GetInfo } from 'src/utils/common.utils';

@Injectable()
export class CardService {
  constructor(private getInfo: GetInfo) {}

  async addProjectCard(userId: string, projectId: string, card: Card) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    const newCard = {
      id: randomUUID(),
      titleCard: card.titleCard,
      tasks: [],
    };

    project.cardTasks.push(newCard);
    user.markModified('projects');

    await user.save();

    return newCard;
  }

  async deleteCard(userId: string, projectId: string, cardId: string) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    const cardDel = project.cardTasks.find((card) => card.id === cardId);

    if (!cardDel) {
      throw new Error('Card não encontrado!');
    }

    project.cardTasks = project.cardTasks.filter((card) => card.id !== cardId);
    user.markModified('projects');

    await user.save();

    return cardDel;
  }

  async moveCard(
    userId: string,
    projectId: string,
    cardId: string,
    position: number,
  ) {
    const { user, project } = await this.getInfo.getUserIdAndProjectId(
      userId,
      projectId,
    );

    const cardIndex = project.cardTasks.findIndex((card) => card.id === cardId);

    if (cardIndex === -1) {
      throw new Error('Card não encontrado!');
    }

    const card = project.cardTasks[cardIndex];
    project.cardTasks.splice(cardIndex, 1);
    project.cardTasks.splice(position, 0, card);
    user.markModified('projects');

    await user.save();

    return card;
  }
}

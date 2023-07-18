import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Task } from '../dtos/entities/tasks.entity';
import { GetInfo } from 'src/utils/common.utils';

@Injectable()
export class TaskService {
  constructor(private getInfo: GetInfo) {}

  async createTask(
    userId: string,
    projectId: string,
    cardId: string,
    task: Task,
  ) {
    const { user, card } = await this.getInfo.getUserIdProjectIdAndCardId(
      userId,
      projectId,
      cardId,
    );

    const newTask = {
      id: randomUUID(),
      titleTask: task.titleTask,
      infoTask: task.infoTask,
      finishedTask: false,
    };

    card.tasks.push(newTask);
    user.markModified('projects');

    await user.save();

    return newTask;
  }

  async updateTask(
    userId: string,
    projectId: string,
    cardId: string,
    taskId: string,
    task: Task,
  ) {
    const { user, card } = await this.getInfo.getUserIdProjectIdAndCardId(
      userId,
      projectId,
      cardId,
    );

    const findTask = card.tasks.find((task) => task.id === taskId);

    findTask.titleTask = task.titleTask;
    findTask.finishedTask = task.finishedTask;
    findTask.infoTask = task.infoTask;
    user.markModified('projects');

    await user.save();

    return findTask;
  }
}

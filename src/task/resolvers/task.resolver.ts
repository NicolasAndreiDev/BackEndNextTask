import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from '../service/task.service';
import { Task } from '../dtos/entities/tasks.entity';
import { CreateTask } from '../dtos/inputs/createTask';
import { UpdateTask } from '../dtos/inputs/updateTask';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(() => String)
  async getHello() {
    return 'hello';
  }

  @Mutation(() => Task)
  async createTask(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
    @Args('cardId') cardId: string,
    @Args('task') task: CreateTask,
  ) {
    return this.taskService.createTask(userId, projectId, cardId, task);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
    @Args('cardId') cardId: string,
    @Args('taskId') taskId: string,
    @Args('task') task: UpdateTask,
  ) {
    return this.taskService.updateTask(userId, projectId, cardId, taskId, task);
  }
}

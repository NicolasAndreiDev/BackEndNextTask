import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Project } from '../dtos/entities/project.entity';
import { CreateProject } from '../dtos/inputs/createProject';
import { ProjectService } from '../service/project.service';
import { FavProjects } from '../dtos/entities/favProjects.entity';
import { UpdateFavProjects } from '../dtos/inputs/updateFavProjects';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => Project)
  async getProject(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
  ) {
    return this.projectService.getProject(userId, projectId);
  }

  @Query(() => [Project])
  async getParticipateProjects(@Args('userId') userId: string) {
    return this.projectService.getParticipateProjects(userId);
  }

  @Mutation(() => Project)
  async createProject(@Args('data') project: CreateProject) {
    return this.projectService.createNewProject(project);
  }

  @Mutation(() => [FavProjects])
  async updateFavProjects(
    @Args('userId') userId: string,
    @Args('projectId') projectId: UpdateFavProjects,
  ) {
    return this.projectService.updateUserFavProjects(userId, projectId);
  }

  @Mutation(() => Project)
  async finishedProject(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
  ) {
    return this.projectService.finishedUserProject(userId, projectId);
  }

  @Mutation(() => Project)
  async deleteProject(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
  ) {
    return this.projectService.deleteUserProject(userId, projectId);
  }

  @Mutation(() => Project)
  async userLeaveProject(
    @Args('userId') userId: string,
    @Args('projectId') projectId: string,
  ) {
    return this.projectService.leaveProject(userId, projectId);
  }
}

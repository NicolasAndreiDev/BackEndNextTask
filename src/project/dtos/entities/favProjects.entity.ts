import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FavProjects {
  @Field()
  projectId: string;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipateProjects {
  @Field()
  userId: string;
  @Field()
  projectId: string;
}

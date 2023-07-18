import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field()
  id?: string;
  @Field()
  titleTask: string;
  @Field({ nullable: true })
  infoTask?: string;
  @Field()
  finishedTask?: boolean;
}

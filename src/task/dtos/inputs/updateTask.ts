import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTask {
  @Field({ nullable: true })
  titleTask: string;
  @Field({ nullable: true })
  infoTask: string;
  @Field({ nullable: true })
  finishedTask: boolean;
}

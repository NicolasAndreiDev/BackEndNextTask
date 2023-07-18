import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTask {
  @Field()
  titleTask: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserNextInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  username: string;
}

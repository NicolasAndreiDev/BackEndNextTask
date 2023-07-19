import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConviteInput {
  @Field()
  userId: string;

  @Field()
  projectId: string;

  @Field()
  email: string;
}

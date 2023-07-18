import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AutenticacaoUser {
  @Field()
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field()
  password: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProject {
  @Field()
  titleProject: string;
  @Field()
  dataAcesso: Date;
  @Field()
  userId: string;
  @Field(() => [String])
  participantes: string[];
  @Field()
  colorProject: string;
  @Field()
  finishedProject: boolean;
}

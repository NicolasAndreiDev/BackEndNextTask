import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Card } from '../../../card/dtos/entities/card.entity';

@ObjectType()
export class Project {
  @Field()
  userId: string;
  @Field(() => ID)
  id?: string;
  @Field()
  titleProject: string;
  @Field()
  dataAcesso: Date;
  @Field(() => [String])
  participantes: string[];
  @Field(() => [Card])
  cardTasks?: Card[];
  @Field()
  colorProject: string;
  @Field()
  finishedProject: boolean;
}

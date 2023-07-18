import { Field, InputType } from '@nestjs/graphql';
import { Card } from '../../../card/dtos/entities/card.entity';

@InputType()
export class UpdateProject {
  @Field({ nullable: true })
  titleProject: string;
  @Field({ nullable: true })
  userId: string;
  @Field({ nullable: true })
  dataAcesso: Date;
  @Field(() => [String], { nullable: true })
  participantes: string[];
  @Field(() => [Card], { nullable: true })
  cardTasks: Card[];
}

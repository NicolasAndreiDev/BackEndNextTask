import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../../../task/dtos/entities/tasks.entity';

@ObjectType()
export class Card {
  @Field()
  id?: string;
  @Field()
  titleCard: string;
  @Field(() => [Task])
  tasks?: Task[];
}

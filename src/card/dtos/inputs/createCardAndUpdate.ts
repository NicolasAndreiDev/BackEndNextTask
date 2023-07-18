import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardAndUpdate {
  @Field()
  titleCard: string;
}

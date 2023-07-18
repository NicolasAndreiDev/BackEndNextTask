import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFavProjects {
  @Field()
  projectId: string;
}

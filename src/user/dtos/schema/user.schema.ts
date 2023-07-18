import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FavProjects } from 'src/project/dtos/entities/favProjects.entity';
import { ParticipateProjects } from 'src/project/dtos/entities/participateProjects.entity';
import { Project } from 'src/project/dtos/entities/project.entity';

@ObjectType()
@Schema({ versionKey: false })
export class User {
  @Field(() => ID)
  id?: string;
  @Field()
  @Prop({ unique: true })
  email: string;
  @Field(() => String)
  @Prop()
  username?: string;
  @Field(() => String || null, { nullable: true })
  @Prop({ required: false })
  bannerColor?: string;
  @Field(() => String || null, { nullable: true })
  @Prop({ required: false })
  perfilColor?: string;
  @Field(() => String)
  @Prop()
  password?: string;
  @Field(() => [Project])
  @Prop()
  projects?: Project[];
  @Field(() => [FavProjects])
  @Prop()
  favProjects?: FavProjects[];
  @Field(() => [ParticipateProjects])
  @Prop()
  participateProjects?: ParticipateProjects[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserType = mongoose.model<UserDocument>('users', UserSchema);

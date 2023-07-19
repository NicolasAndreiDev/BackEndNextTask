import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@ObjectType()
@Schema({ versionKey: false })
export class Invitation {
  @Field(() => ID)
  id?: string;
  @Field(() => String)
  @Prop()
  email: string;
  @Field(() => String)
  @Prop()
  projectId: string;
  @Field(() => String)
  @Prop()
  userId: string;
  @Field(() => Date)
  @Prop()
  createAt?: Date;
  @Field(() => Date)
  @Prop()
  expiresAt?: Date;
}

export type InvitationDocument = Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
export const InvitationType = mongoose.model<InvitationDocument>(
  'invitations',
  InvitationSchema,
);

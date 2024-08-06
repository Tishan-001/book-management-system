import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/schema/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  coverImage?: string;

  @Field(() => String)
  @Prop({ required: true })
  author: string;

  @Field(() => String)
  @Prop({ required: true })
  publishedYear: string;

  @Field(() => String, { nullable: true })
  @Prop()
  genre?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  pdfLink?: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  ownerId: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);

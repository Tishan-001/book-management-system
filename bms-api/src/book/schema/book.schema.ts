import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from 'src/user/schema/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
@ObjectType()
export class Book {
  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop()
  author: string;

  @Field(() => Int)
  @Prop({ required: true })
  publishedYear: number;

  @Field({ nullable: true })
  @Prop()
  genre: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);

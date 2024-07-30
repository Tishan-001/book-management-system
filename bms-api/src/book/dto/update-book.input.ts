import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String)
  _id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;

  @Field(() => Int, { nullable: true })
  publishedYear?: number;

  @Field({ nullable: true })
  genre?: string;
}

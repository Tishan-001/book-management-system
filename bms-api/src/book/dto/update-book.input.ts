import { Field, InputType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;

  @Field(() => String, { nullable: true })
  publishedYear?: string;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  description?: string;
}

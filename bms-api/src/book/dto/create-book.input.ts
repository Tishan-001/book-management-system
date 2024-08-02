import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  coverImage: string;

  @Field(() => String)
  author: string;

  @Field(() => String)
  publishedYear: string;

  @Field(() => String, { nullable: true })
  genre: string;

  @Field(() => String, { nullable: true })
  pdfLink: string;

  @Field(() => String)
  description: string;
}

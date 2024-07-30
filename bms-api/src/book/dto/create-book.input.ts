import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  author: string;

  @Field(() => Int)
  publishedYear: number;

  @Field(() => String, { nullable: true })
  genre: string;
}

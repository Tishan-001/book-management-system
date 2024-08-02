import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  filename: string;

  @Field()
  url: string;
}

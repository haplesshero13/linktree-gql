import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLinkInput {
  @Field()
  text: string;

  @Field()
  href: string;
}

@InputType()
export class UpdateLinkInput {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field()
  href: string;
}

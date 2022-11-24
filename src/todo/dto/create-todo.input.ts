import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  content: string;
}

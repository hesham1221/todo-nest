
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput{

  @Field()
  id:number

  @Field()
  content: string;
}
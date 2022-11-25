import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class todoMessage{
    @Field()
    message :string

    @Field()
    code : number
}
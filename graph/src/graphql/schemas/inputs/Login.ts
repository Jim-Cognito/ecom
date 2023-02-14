import { IsString } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    @IsString()
    email: string;

    @Field()
    @IsString()
    password: string;
}

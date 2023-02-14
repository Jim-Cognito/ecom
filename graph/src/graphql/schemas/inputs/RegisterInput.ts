import { IsString } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @IsString()
    firstName: string;

    @Field()
    @IsString()
    lastName: string;

    @Field()
    @IsString()
    email: string;

    @Field()
    @IsString()
    password: string;
}

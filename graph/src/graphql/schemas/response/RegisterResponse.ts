import { ObjectType, Field } from "type-graphql";
import { User } from "../User";

@ObjectType()
export class RegisterResponse {
    @Field(() => User)
    user: User;

    @Field(() => String)
    token: string;

    // @Field(() => String)
    // refreshToken: string;
}

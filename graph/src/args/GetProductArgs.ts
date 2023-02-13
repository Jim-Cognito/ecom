import { IsOptional } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class GetProductArgs {
    @Field((type) => String, {nullable: true})
    @IsOptional()
    category?: string | null;
}
import { ObjectType, Field, Float, ID } from "type-graphql";

@ObjectType()
export class Product {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => Float)
    price: number;

    @Field(() => String)
    category: string;

    @Field(() => Number)
    qty: number;

    @Field(() => String, { nullable: true })
    colour?: string | null;

    @Field(() => String, { nullable: true })
    imgUrl?: string | null;
}

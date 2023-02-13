import { Product } from '../schemas/Product';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ProductResponse {
  @Field(() => [Product])
  products: Product[];
}
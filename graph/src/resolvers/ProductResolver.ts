import { PrismaClient } from '@prisma/client';
import { Args, Query, Resolver } from 'type-graphql';
import { GetProductArgs } from '../args/GetProductArgs';
import { ProductResponse } from '../response/ProductResponse';
import { Product } from '../schemas/Product';

const prisma = new PrismaClient();

@Resolver((of) => Product)
export class ProductResolver {
    @Query((returns) => ProductResponse)
    async listProducts(@Args() { category }: GetProductArgs): Promise<ProductResponse>{
        const products = await prisma.product.findMany({
            where: {
                category: {
                    contains: category !== null ? category : undefined
                }
            }
        })
        return {
            products
        }
    }
}

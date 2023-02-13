import { PrismaClient } from '@prisma/client';
import { Query, Resolver } from 'type-graphql';
import { ProductResponse } from '../response/ProductResponse';
import { Product } from '../schemas/Product';

const prisma = new PrismaClient();

@Resolver((of) => Product)
export class ProductResolver {
    @Query((returns) => ProductResponse)
    async listProducts(): Promise<ProductResponse>{
        const products = await prisma.product.findMany()
        return {
            products
        }
    }
}
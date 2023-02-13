import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories: { category: string, names: string[]}[] = [
    {
        category: "Glitter",
        names: ["Gold Glitter", "Pink Glitter", "Green Glitter"]
    },
    {
        category: "Foils",
        names: ["Gold Foil", "Pink Foil", "Green Foil"]
    },
    {
        category: "Sequins",
        names: ["Gold Sequins", "Pink Sequins", "Green Sequins"]
    },
    {
        category: "Stickers",
        names: ["Star Stickers", "Moon Stickers", "Letters"]
    },
    {
        category: "Tools",
        names: ["Nail Brush", "Nail File", "Cuticle Pusher"]
    },
]

async function main() {

    // create products
    categories.forEach((c) => {
        c.names.forEach(async (n) => {
            await prisma.product.create({
                data: {
                    name: n,
                    price: 1.99,
                    description: `Luxury ${n}.`,
                    category: c.category,
                    qty: 10,
                    colour: "Gold"
                }
            })
        })
    })
}
  
main()
.catch(e => {
    throw e
})
.finally(async () => {
    await prisma.$disconnect()
});

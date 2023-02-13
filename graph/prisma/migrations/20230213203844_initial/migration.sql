-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "imgUrl" TEXT,
    "colour" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

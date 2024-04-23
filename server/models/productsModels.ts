import { z } from "zod";
import { prisma } from "..";
import { newProductValidator } from "../utils/productUtils";

export async function getAllProducts(value: string) {
  const products = await prisma.item.findMany({
    where: {
      OR: [
        {
          name: {
            contains: value,
            mode: "insensitive",
          },
        },
        {
          Producent: {
            name: {
              contains: value,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      Producent: {
        select: {
          name: true,
        },
      },
    },
  });

  return products;
}

export async function getBestsellingProducts() {
  const bestsellersIds = await prisma.orderItem.groupBy({
    by: ["itemId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 20,
  });

  const itemIds = bestsellersIds.map((product) => product.itemId);
  const items = await prisma.item.findMany({
    where: {
      id: {
        in: itemIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const productSales = bestsellersIds.map((product) => ({
    itemId: product.itemId,
    totalOrders: product._sum.quantity,
    name: items.find((item) => item.id === product.itemId)?.name,
  }));

  return productSales;
}

export async function addNewProduct({
  name,
  price,
  description,
  producent,
  category,
  image,
}: z.infer<typeof newProductValidator>) {
  const product = await prisma.item.create({
    data: {
      name,
      price,
      description,
      stock: 0,
      producentId: producent,
      categoryId: category,
      image: image,
    },
  });

  return product;
}

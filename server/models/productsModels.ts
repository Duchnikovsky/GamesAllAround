import { prisma } from "..";

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
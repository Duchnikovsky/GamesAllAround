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
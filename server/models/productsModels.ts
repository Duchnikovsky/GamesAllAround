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

export async function getProductById(id: string) {
  const product = await prisma.item.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      Producent: {
        select: {
          name: true,
          id: true,
        },
      },
      Category: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return {
    ...product,
    producent: product!.Producent!.id,
    category: product!.Category!.id,
  };
}

export async function editProductById({
  id,
  name,
  price,
  description,
  producent,
  category,
}: {
  id: string;
  name: string;
  price: number;
  description: string;
  producent: string;
  category: string;
}) {
  const product = await prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
      producentId: producent,
      categoryId: category,
    },
  });

  return product;
}

export async function removeProductById(id: string) {
  await prisma.item.delete({
    where: {
      id,
    },
  });
}

export async function addProductCode(itemId: string, codes: string) {
  await prisma.itemCode.createMany({
    data: codes.split(";").map((code) => ({
      code,
      itemId,
    })),
    skipDuplicates: true,
  });

  const count = codes.split(";").length;

  await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      stock: {
        increment: count,
      },
    },
  });
}

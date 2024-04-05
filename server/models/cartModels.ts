import { prisma } from "..";

export async function getCartItems(userId: string) {
  return await prisma.cart.findMany({
    where: {
      userId,
    },
    select: {
      itemId: true,
      Item: {
        select: {
          name: true,
          price: true,
          image: true,
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

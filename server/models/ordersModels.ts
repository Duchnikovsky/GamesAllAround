import { prisma } from "..";

export async function getOrdersByValue(value: string) {
  const orders = await prisma.order.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        {
          id: {
            contains: value,
          },
        },
        {
          User: {
            email: {
              contains: value,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      status: true,
      User: {
        select: {
          email: true,
        },
      },
      OrderItem: {
        select: {
          subtotal: true,
          quantity: true,
          Item: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return orders.map(order => ({
    id: order.id,
    customer: order.User.email,
    status: order.status,
    cost: order.OrderItem.reduce((sum, item) => sum + item.subtotal, 0),
    products: order.OrderItem.map(item => ({
      id: item.Item.id,
      name: item.Item.name,
      price: item.Item.price,
      quantity: item.quantity
    }))
  }));
}
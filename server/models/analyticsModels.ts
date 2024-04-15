import { prisma } from "..";

export async function getSalesInWeek(endDate: Date) {
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7);

  const sales = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      OrderItem: {
        select: {
          subtotal: true,
        },
      },
    },
  });

  const totalEarnings = sales.reduce((total, order) => {
    const orderTotal = order.OrderItem.reduce((subtotal, item) => {
      return subtotal + item.subtotal;
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalEarnings;
}

export async function getLatestUsers(value: string) {
  const users = await prisma.user.findMany({
    take: 20,
    where: {
      email: {
        contains: value,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      email: true,
      createdAt: true,
    }
  });

  return users;
}

export async function getNewUsersCount() {
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 7);

  const newUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      }
    },
  });

  return newUsers;
}

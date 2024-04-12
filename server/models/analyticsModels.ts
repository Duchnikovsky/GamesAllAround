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
    }
  });

  const totalEarnings = sales.reduce((total, order) => {
    const orderTotal = order.OrderItem.reduce((subtotal, item) => {
      return subtotal + item.subtotal;
    }, 0);
    return total + orderTotal;
  }, 0);
  
  return totalEarnings;
}

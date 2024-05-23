import { prisma } from "..";
import { CustomerDataTypes } from "../utils/customersUtils";

export async function getCustomersByValue(value: string) {
  const customers = await prisma.user.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        {
          email: {
            contains: value,
          },
        },
        {
          id: {
            contains: value,
          },
        },
      ],
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      Order: {
        select: {
          id: true,
        },
      },
      Address: {
        select: {
          voivodeship: true,
          district: true,
          town: true,
          street: true,
          residence: true,
          postcode: true,
        },
      },
      Personal: {
        select: {
          name: true,
          lastname: true,
          phone: true,
        },
      },
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    email: customer.email,
    role: customer.role,
    ordersQuantity: customer.Order.length,
    createdAt: customer.createdAt.toISOString(),
    address: customer.Address,
    personal: customer.Personal,
  }));
}

export async function getCustomerById(customerId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: customerId,
    },
    include: {
      Address: true,
      Personal: true,
    },
  });

  return user;
}

export async function deleteCustomerById(customerId: string) {
  await prisma.user.delete({
    where: {
      id: customerId,
    },
  });
}

export async function deleteCustomersById(customersId: string[]) {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: customersId,
      },
    },
  });

  await prisma.address.deleteMany({
    where: {
      userId: {
        in: customersId,
      },
    },
  });

  await prisma.personal.deleteMany({
    where: {
      userId: {
        in: customersId,
      },
    },
  });

  await prisma.cart.deleteMany({
    where: {
      userId: {
        in: customersId,
      },
    },
  });

  await prisma.order.deleteMany({
    where: {
      userId: {
        in: customersId,
      },
    },
  });
}

export async function updateCustomerById(
  customerId: string,
  body: CustomerDataTypes
) {
  const isAddress = await prisma.address.findFirst({
    where: {
      userId: customerId,
    },
  });

  if (!isAddress) {
    await prisma.address.create({
      data: {
        userId: customerId,
        voivodeship: body.address.voivodeship,
        district: body.address.district,
        town: body.address.town,
        street: body.address.street,
        residence: body.address.residence,
        postcode: body.address.postcode,
      },
    });
  } else {
    await prisma.address.update({
      where: {
        userId: customerId,
      },
      data: {
        voivodeship: body.address.voivodeship,
        district: body.address.district,
        town: body.address.town,
        street: body.address.street,
        residence: body.address.residence,
        postcode: body.address.postcode,
      },
    });
  }

  const isPersonal = await prisma.personal.findFirst({
    where: {
      userId: customerId,
    },
  });
  if (!isPersonal) {
    await prisma.personal.create({
      data: {
        userId: customerId,
        name: body.personal.name,
        lastname: body.personal.lastname,
        phone: body.personal.phone,
      },
    });
  } else {
    await prisma.personal.update({
      where: {
        userId: customerId,
      },
      data: {
        name: body.personal.name,
        lastname: body.personal.lastname,
        phone: body.personal.phone,
      },
    });
  }
}

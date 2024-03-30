import { prisma } from "..";

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function createUser(email: string, password: string) {
  return await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}

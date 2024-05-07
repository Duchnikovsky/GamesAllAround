import { prisma } from "..";

export async function fetchProducents() {
  const producents = await prisma.producent.findMany();

  return producents;
}

export async function getProducentByName(name: string) {
  const producent = await prisma.producent.findFirst({
    where: {
      name,
    },
  });

  return producent;
}

export async function addNewProducent(name: string) {
  await prisma.producent.create({
    data: {
      name,
    },
  });
}

import { prisma } from "..";

export async function fetchProducents() {
  const producents = await prisma.producent.findMany();

  return producents;
}

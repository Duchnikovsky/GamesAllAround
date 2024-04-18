import { prisma } from "..";

interface CategoryTypes {
  value: string;
  label: string;
}

export async function fetchCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

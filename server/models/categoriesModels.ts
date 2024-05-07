import { prisma } from "..";

interface CategoryTypes {
  value: string;
  label: string;
}

export async function fetchCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

export async function getCategoryByName(name: string) {
  const category = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  return category;
}

export async function addNewCategory(name: string) {
  await prisma.category.create({
    data: {
      name,
    },
  });
}

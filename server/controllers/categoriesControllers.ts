import { Request, Response } from "express";
import { z } from "zod";
import {
  addNewCategory,
  fetchCategories,
  getCategoryByName,
} from "../models/categoriesModels";
import { getAuthSession } from "./authControllers";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await fetchCategories();

    return res.status(200).send(categories);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch categories, try again later");
  }
}

export async function addCategory(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to create this data");

    const categorySchema = z
      .object({
        name: z
          .string()
          .min(1, "Name is too short")
          .max(100, "Name is too long"),
      })
      .parse({
        name: body.name,
      });

    const category = await getCategoryByName(categorySchema.name);

    if (category) return res.status(400).send("Category already exists");

    await addNewCategory(categorySchema.name);

    return res.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not add category, try again later");
  }
}

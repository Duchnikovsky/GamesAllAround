import { Request, Response } from "express";
import { z } from "zod";
import { fetchCategories } from "../models/categoriesModels";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await fetchCategories()
    
    return res.status(200).send(categories);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch categories, try again later");
  }
}

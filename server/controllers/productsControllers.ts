import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { z } from "zod";
import {
  addNewProduct,
  getAllProducts,
  getBestsellingProducts,
} from "../models/productsModels";
import { newProductValidator } from "../utils/productUtils";

export async function getProducts(req: Request, res: Response) {
  const body = req.query;

  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN") {
      return res.status(401).send("You aren't authorized to fetch this data");
    }

    const products = await getAllProducts(body.value as string);

    return res.status(200).send(products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch data, try again later");
  }
}

export async function getBestsellers(req: Request, res: Response) {
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN") {
      return res.status(401).send("You aren't authorized to fetch this data");
    }

    const products = await getBestsellingProducts();

    return res.status(200).send(products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch data, try again later");
  }
}

export async function addProduct(req: Request, res: Response) {
  const body = req.body;

  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN") {
      return res.status(401).send("You aren't authorized to add products");
    }

    const payload =
      newProductValidator.parse({
        name: body.name,
        price: Number(body.price),
        description: body.description,
        producent: body.producent,
        category: body.category,
        image: body.image,
      });

    const product = await addNewProduct(payload);

    return res.status(200).send(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not add product, try again later");
  }
}

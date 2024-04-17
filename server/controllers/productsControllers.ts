import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { z } from "zod";
import { getAllProducts } from "../models/productsModels";

export async function getProducts(req: Request, res: Response) {
  const body = req.query

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
    return res.status(500).send("Could fetch data, try again later");
  }
}

import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { z } from "zod";
import {
  addNewProduct,
  addProductCode,
  editProductById,
  getAllProducts,
  getBestsellingProducts,
  getProductById,
  removeProductById,
} from "../models/productsModels";
import {
  editProductValidator,
  newProductValidator,
} from "../utils/productUtils";

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

    const payload = newProductValidator.parse({
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

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.query;

    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to fetch this data");

    const product = await getProductById(id as string);

    return res.status(200).send(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch product, try again later");
  }
}

export async function editProduct(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to edit this data");

    const payload = editProductValidator.parse({
      id: body.id,
      name: body.name,
      price: Number(body.price),
      description: body.description,
      producent: body.producent,
      category: body.category,
    });

    await editProductById(payload);

    return res.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not update product, try again later");
  }
}

export async function removeProduct(req: Request, res: Response) {
  try {
    const { id } = req.query;

    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to remove this data");

    await removeProductById(id as string);

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send("Could not remove product, try again later");
  }
}

export async function addProductCodes(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);
    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to update this data");

    const { id, codes } = z
      .object({
        id: z.string().min(1, "Invalid product id"),
        codes: z.string().min(18, "Invalid codes"),
      })
      .parse({
        id: body.id,
        codes: body.codes,
      });

    await addProductCode(id, codes);

    return res.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not upload codes, try again later");
  }
}

import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { getCartItems } from "../models/cartModels";
import { z } from "zod";

export async function getItems(req: Request, res: Response) {
  try {
    const session = await getAuthSession(req);

    if (!session) {
      return res.status(401).send("You aren't signed in");
    }

    const cart = await getCartItems(session.id);

    return res.status(200).send(cart);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could sign out, try again later");
  }
}

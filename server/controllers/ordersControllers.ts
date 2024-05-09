import { Request, Response } from "express";
import { z } from "zod";
import { getAuthSession } from "./authControllers";
import { getOrdersByValue } from "../models/ordersModels";

export async function getOrders(req: Request, res: Response) {
  const body = req.query;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to fetch this data");

    const { value } = z
      .object({
        value: z.string(),
      })
      .parse({
        value: body.value,
      });

    const orders = await getOrdersByValue(value);

    return res.status(200).send(orders);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch orders, try again later");
  }
}

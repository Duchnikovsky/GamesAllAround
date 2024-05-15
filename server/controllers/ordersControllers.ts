import { Request, Response } from "express";
import { z } from "zod";
import { getAuthSession } from "./authControllers";
import { changeStatusByIds, deleteOrdersByIds, getOrdersByValue } from "../models/ordersModels";
import { OrderStatus } from "@prisma/client";

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

export async function changeStatus(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to modify this data");

    const { orders, status } = z
      .object({
        orders: z.array(z.string()),
        status: z.enum([
          "PENDING",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ]),
      })
      .parse(body);

    await changeStatusByIds(orders, status);

    return res.status(200).send("Orders status changed successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch orders, try again later");
  }
}

export async function deleteOrders(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to delete this data");

    const { orders } = z
      .object({
        orders: z.array(z.string()),
      })
      .parse(body);

    await deleteOrdersByIds(orders);

    return res.status(200).send("Orders deleted successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch orders, try again later");
  }
}

import { Request, Response } from "express";
import { z } from "zod";
import {
  addNewProducent,
  fetchProducents,
  getProducentByName,
} from "../models/producentsModels";
import { getAuthSession } from "./authControllers";

export async function getProducents(req: Request, res: Response) {
  try {
    const producents = await fetchProducents();

    return res.status(200).send(producents);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch producents, try again later");
  }
}

export async function addProducent(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN")
      return res.status(401).send("You aren't authorized to create this data");

    const producentSchema = z
      .object({
        name: z
          .string()
          .min(1, "Name is too short")
          .max(100, "Name is too long"),
      })
      .parse({
        name: body.name,
      });

    const producent = await getProducentByName(producentSchema.name);

    if (producent) return res.status(400).send("Producent already exists");

    await addNewProducent(producentSchema.name);

    return res.status(200).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not add producent, try again later");
  }
}

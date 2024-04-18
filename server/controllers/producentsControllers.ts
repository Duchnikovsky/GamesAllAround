import { Request, Response } from "express";
import { z } from "zod";
import { fetchProducents } from "../models/producentsModels";

export async function getProducents(req: Request, res: Response) {
  try {
    const producents = await fetchProducents()
    
    return res.status(200).send(producents);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not fetch producents, try again later");
  }
}

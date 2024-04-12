import { Request, Response } from "express";
import { getAuthSession } from "./authControllers";
import { z } from "zod";
import { getSalesInWeek } from "../models/analyticsModels";

interface WeeklySalesTypes {
  name: string;
  endDate: Date;
  sales: number;
}

export async function getSales(req: Request, res: Response) {
  try {
    const session = await getAuthSession(req);

    if (!session || session.role !== "ADMIN") {
      return res.status(401).send("You aren't authorized to fetch this data");
    }

    const todayDate = new Date();

    const weeklySales: WeeklySalesTypes[] = [];

    for (let i = 0; i < 4; i++) {
      const endDate = new Date(todayDate);
      endDate.setDate(todayDate.getDate() - i * 7);
      const sales = await getSalesInWeek(endDate);
      weeklySales.push({ name: `Week ${i+1}`, endDate: endDate, sales: sales });
    }

    return res.status(200).send(weeklySales);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could fetch data, try again later");
  }
}

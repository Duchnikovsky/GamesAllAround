import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();
import { z } from "zod";

router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send("An error occured");
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { query, category } = z
      .object({
        query: z.string().min(0).max(50),
        category: z.string(),
      })
      .parse({
        query: req.query.query,
        category: req.query.category,
      });

    const categoryId = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });

    if (categoryId) {
      const items = await prisma.item.findMany({
        take: 10,
        where: {
          categoryId: categoryId.id,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { Producent: { name: { contains: query, mode: "insensitive" } } },
          ],
        },
        orderBy: {
          name: "asc",
        },
      });
      return res.status(200).send(items);
    } else {
      const items = await prisma.item.findMany({
        take: 10,
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { Producent: { name: { contains: query, mode: "insensitive" } } },
          ],
        },
        orderBy: {
          name: "asc",
        },
      });
      return res.status(200).send(items);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }

    return res.status(500).send("An error occured");
  }
});

module.exports = router;

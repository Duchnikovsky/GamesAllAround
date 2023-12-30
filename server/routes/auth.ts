import { Request, Response } from "express";
import { getAuthSession, prisma } from "..";
import { z } from "zod";
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.get("/getAuth", async (req: Request, res: Response) => {
  const session = await getAuthSession(req);

  if (session) {
    return res.status(200).send(session);
  } else {
    return res.status(401).send(session);
  }
});

router.post("/signIn", async (req: Request, res: Response) => {
  const body = await req.body;

  try {
    const session = await getAuthSession(req);

    if (session) {
      return res.status(401).send("You are aleady signed in");
    }

    const { email, password } = z
      .object({
        email: z
          .string()
          .email("Email has to be valid")
          .max(100, "Email has to be valid")
          .min(5, "Email has to be valid"),
        password: z
          .string()
          .min(8, "Password must be between 8-18 characters")
          .max(18, "Password must be between 8-18 characters"),
      })
      .parse({
        email: body.email,
        password: body.password,
      });

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return res.status(400).send("Invalid email or password");

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      { authenticated: true, id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 36000000,
    });

    return res.status(200).send("Signed in");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not sign in");
  }
});

module.exports = router;

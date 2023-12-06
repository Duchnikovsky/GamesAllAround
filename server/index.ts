const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
import { Request } from "express";

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import { AuthSession, DecodedTypes } from "./types/auth";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

export async function getAuthSession(req: Request): Promise<AuthSession> {
  return new Promise((resolve) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(
        token,
        process.env.SECRET_KEY,
        (error: string, decoded: DecodedTypes) => {
          if (error) {
            resolve(false);
          }
          if (decoded.authenticated === true) {
            resolve(decoded);
          } else {
            resolve(false);
          }
        }
      );
    } else {
      resolve(false);
    }
  });
}

const searchRoute = require("./routes/search");
const authRoute = require("./routes/auth");

app.use("/search", searchRoute);
app.use("/auth", authRoute);

const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

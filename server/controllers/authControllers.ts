import { Request, Response } from "express";
import { DecodedTypes } from "../types/authTypes";
import { z } from "zod";
import { createUser, getUserByEmail } from "../models/authModels";
import { signInValidator, signUpValidator } from "../utils/authUtils";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export type AuthSession = DecodedTypes | false;

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

export async function signIn(req: Request, res: Response) {
  const body = req.body;

  try {
    const session = await getAuthSession(req);

    if (session) {
      return res.status(401).send("You are aleady signed in");
    }

    const { email, password } = signInValidator.parse({
      email: body.email,
      password: body.password,
    });

    const user = await getUserByEmail(email);
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

    return res.status(200).send("Successfully signed in");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not sign in");
  }
}

export async function signOut(req: Request, res: Response) {
  try {
    const session = await getAuthSession(req);

    if (!session) {
      return res.status(401).send("You aren't signed in");
    }

    res.clearCookie("token");
    res.status(200).send("Successfully signed out");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could sign out, try again later");
  }
}

export async function signUp(req: Request, res: Response) {
  const body = await req.body;
  try {
    const session = await getAuthSession(req);

    if (session) {
      return res.status(401).send("You can't sign up while signed in");
    }

    const { email, password, rep_password } = signUpValidator.parse({
      email: body.email,
      password: body.password,
      rep_password: body.rep_password,
    });

    if (password !== rep_password) {
      return res.status(400).send("Passwords do not match");
    }

    const user = await getUserByEmail(email);
    if (user) return res.status(400).send("User already exists");

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await createUser(email, hashedPass);

    if (newUser) return res.status(200).send("Successfully signed up");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.status(500).send("Could not sign up");
  }
}

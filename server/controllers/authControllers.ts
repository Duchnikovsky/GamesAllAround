import { Request, Response } from 'express';
import { DecodedTypes } from '../types/authTypes';
const jwt = require("jsonwebtoken");

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
const express = require("express");
import { Request, Response, Router } from "express";
import {
  getAuthSession,
  signIn,
  signOut,
  signUp,
} from "../controllers/authControllers";

const router: Router = express.Router();

router.post("/signIn", signIn);

router.post("/signUp", signUp);

router.post("/signOut", signOut);

router.get("/getAuth", async (req: Request, res: Response) => {
  const session = await getAuthSession(req);

  if (session) {
    return res.status(200).send(session);
  } else {
    return res.status(401).send(session);
  }
});

module.exports = router;

import { Request, Response } from "express";
import { getAuthSession } from "..";
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

module.exports = router;

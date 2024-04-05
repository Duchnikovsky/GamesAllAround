const express = require("express");
import { Request, Response, Router } from "express";
import {
  getAuth,
  getAuthSession,
  signIn,
  signOut,
  signUp,
} from "../controllers/authControllers";

const router: Router = express.Router();

router.post("/signIn", signIn);

router.post("/signUp", signUp);

router.post("/signOut", signOut);

router.get("/getAuth", getAuth);

module.exports = router;

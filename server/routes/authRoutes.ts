import express, { Request, Response, Router } from "express";
import { getAuthSession, signIn } from "../controllers/authControllers";

const router: Router = express.Router();

router.get("/getAuth", async (req: Request, res: Response) => {
  const session = await getAuthSession(req);

  if (session) {
    return res.status(200).send(session);
  } else {
    return res.status(401).send(session);
  }
});

router.post("/signIn", signIn);

export default router;

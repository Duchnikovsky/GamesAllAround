import express = require("express");
import {
  addProducent,
  getProducents,
} from "../controllers/producentsControllers";

const router: express.Router = express.Router();

router.get("/getProducents", getProducents);

router.post("/addProducent", addProducent);

module.exports = router;

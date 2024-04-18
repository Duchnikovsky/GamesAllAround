import express = require("express");
import { getProducents } from "../controllers/producentsControllers";

const router: express.Router = express.Router();

router.get("/getProducents", getProducents);

module.exports = router;

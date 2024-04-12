import express = require("express");
import { getSales } from "../controllers/analyticsControllers";

const router: express.Router = express.Router();

router.get("/analytics/getSales", getSales);

module.exports = router;
import express = require("express");
import { getSales, getUsers } from "../controllers/analyticsControllers";

const router: express.Router = express.Router();

router.get("/analytics/getSales", getSales);

router.get("/analytics/getUsers", getUsers)

module.exports = router;
import express = require("express");
import {
  getOrders,
  getSales,
  getUsers,
} from "../controllers/analyticsControllers";

const router: express.Router = express.Router();

router.get("/analytics/getSales", getSales);

router.get("/analytics/getUsers", getUsers);

router.get("/analytics/getOrders", getOrders);

module.exports = router;

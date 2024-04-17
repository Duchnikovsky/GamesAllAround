import express = require("express");
import {
  getOrders,
  getSales,
  getUsers,
} from "../controllers/analyticsControllers";
import { getProducts } from "../controllers/productsControllers";

const router: express.Router = express.Router();

router.get("/analytics/getSales", getSales);

router.get("/analytics/getUsers", getUsers);

router.get("/analytics/getOrders", getOrders);

router.get("/products/getProducts", getProducts);


module.exports = router;

import express = require("express");
import { getOrders } from "../controllers/ordersControllers";
const router: express.Router = express.Router();

router.get('/getOrders', getOrders)

module.exports = router;

import express = require("express");
import { changeStatus, deleteOrders, getOrders } from "../controllers/ordersControllers";
const router: express.Router = express.Router();

router.get('/getOrders', getOrders)

router.post('/changeStatus', changeStatus)

router.delete('/deleteOrders', deleteOrders)

module.exports = router;

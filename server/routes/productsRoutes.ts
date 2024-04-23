import express = require("express");
import { addProduct } from "../controllers/productsControllers";

const router: express.Router = express.Router();

router.post("/addProduct", addProduct);

module.exports = router;

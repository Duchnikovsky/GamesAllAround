import express = require("express");
import { addProduct, addProductCodes, editProduct, getProduct, removeProduct } from "../controllers/productsControllers";

const router: express.Router = express.Router();

router.post("/addProduct", addProduct);

router.put('/editProduct', editProduct);

router.get("/getProduct", getProduct);

router.delete('/removeProduct', removeProduct)

router.post('/addCodes', addProductCodes)

module.exports = router;

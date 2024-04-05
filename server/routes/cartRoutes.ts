import express = require("express");
import { getItems } from "../controllers/cartControllers";

const router: express.Router = express.Router();

router.get("/getItems", getItems);

module.exports = router;
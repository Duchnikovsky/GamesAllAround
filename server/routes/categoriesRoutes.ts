import express = require("express");
import { getCategories } from "../controllers/categoriesControllers";

const router: express.Router = express.Router();

router.get("/getCategories", getCategories);

module.exports = router;

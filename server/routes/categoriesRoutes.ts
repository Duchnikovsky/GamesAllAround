import express = require("express");
import {
  addCategory,
  getCategories,
} from "../controllers/categoriesControllers";

const router: express.Router = express.Router();

router.get("/getCategories", getCategories);

router.post("/addCategory", addCategory);

module.exports = router;

import express = require("express");
import { deleteCustomer, deleteCustomers, getCustomer, getCustomers, updateCustomer } from "../controllers/customersControllers";
const router: express.Router = express.Router();

router.get('/getCustomers', getCustomers)

router.get('/getCustomer', getCustomer)

router.delete('/deleteCustomer', deleteCustomer)

router.delete('/deleteCustomers', deleteCustomers)

router.put('/updateCustomer', updateCustomer)

module.exports = router;

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.searchCustomer);

router.post("/", customerController.saveCustomer);

router.put("/", customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;

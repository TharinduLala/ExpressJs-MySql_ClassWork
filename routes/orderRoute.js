const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.get("/:orderId", orderController.searchOrder);

router.post("/", orderController.saveOrder);

router.put("/", orderController.updateOrder);

router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
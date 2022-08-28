const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.getAllItems);

router.get("/:code", itemController.searchItem);

router.post("/", itemController.saveItem);

router.put("/", itemController.updateItem);

router.delete("/:code", itemController.deleteItem);

module.exports = router;

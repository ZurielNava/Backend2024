const express = require("express");
const router = express.Router();
const { getAllSales, createSale } = require("../controllers/salesController");

router.get("/", getAllSales);
router.post("/", createSale);

module.exports = router;
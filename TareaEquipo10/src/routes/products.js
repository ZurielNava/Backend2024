const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct } = require("../controllers/productsController");

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;
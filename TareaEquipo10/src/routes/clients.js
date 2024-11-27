const express = require("express");
const router = express.Router();
const { getAllClients, createClient } = require("../controllers/clientsController");

router.get("/", getAllClients);
router.post("/", createClient);

module.exports = router;
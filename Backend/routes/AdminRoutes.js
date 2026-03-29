const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/AdminController");
const adminAuth = require("../Middleware/AdminAuth");

router.post("/login", loginAdmin);

module.exports = router;
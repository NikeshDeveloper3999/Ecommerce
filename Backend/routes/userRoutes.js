const express = require("express");
const router = express.Router();

const userController = require("../controllers/usercontroller");
const authMiddleware = require("../Middleware/authuser");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);
router.get("/me", authMiddleware, userController.getUserDetails);

module.exports = router;
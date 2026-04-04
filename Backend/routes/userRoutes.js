// routes/userRoutes.js
const express = require ("express");
const router = express.Router();

const userController =  require( "../controllers/usercontroller");

// ================================
// 🔹 USER AUTH & CRUD ROUTES
// ================================

// 1️⃣ Register new user
// POST /api/users/register
router.post("/register", userController.registerUser);

// 2️⃣ Login user
// POST /api/users/login
router.post("/login", userController.loginUser);

// 3️⃣ Update user by ID
// PUT /api/users/update/:id
router.put("/update/:id", userController.updateUser);

// 4️⃣ Delete user by ID
// DELETE /api/users/delete/:id
router.delete("/delete/:id", userController.deleteUser);


module.exports = router;
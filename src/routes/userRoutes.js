const express = require("express");
const { body, param } = require("express-validator");
const {
  registerUser,
  loginUser,
  verifyUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Validation middleware for registration
const registerUserValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation middleware for updating user
const updateUserValidation = [
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Register User
router.post("/register", registerUserValidation, registerUser);
router.post("/", registerUserValidation, registerUser);

// Login User
router.post("/login", loginUser);

// Verify User (Admin only)
router.put("/verify/:id", roleMiddleware("admin"), verifyUser);

// Get all users (Admin only)
router.get("/", roleMiddleware("admin"), getUsers);

// Get user by ID (Admin only)
router.get("/:id", roleMiddleware("admin"), getUserById);

// Update user (Admin only)
router.put("/:id", roleMiddleware("admin"), updateUserValidation, updateUser);

// Delete user (Admin only)
router.delete("/:id", roleMiddleware("admin"), deleteUser);

module.exports = router;

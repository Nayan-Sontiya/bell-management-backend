const express = require("express");
const router = express.Router();
const {
  addBell,
  getAllBells,
  getBellById,
  updateBell,
  deleteBell,
} = require("../controllers/bellController");
const { isVerified } = require("../middleware/authMiddleware");

// Create a new bell
router.post("/", isVerified, addBell);

// Get all bells
router.get("/", isVerified, getAllBells);

// Get a single bell by ID
router.get("/:id", isVerified, getBellById);

// Update a bell by ID
router.put("/:id", isVerified, updateBell);

// Delete a bell by ID
router.delete("/:id", isVerified, deleteBell);

module.exports = router;

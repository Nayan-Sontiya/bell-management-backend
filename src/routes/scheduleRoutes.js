const express = require("express");
const router = express.Router();
const {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");
const { isVerified } = require("../middleware/authMiddleware");

// Create a new schedule
router.post("/", isVerified, addSchedule);

// Get all schedules
router.get("/", isVerified, getAllSchedules);

// Get a single schedule by ID
router.get("/:id", isVerified, getScheduleById);

// Update a schedule by ID
router.put("/:id", isVerified, updateSchedule);

// Delete a schedule by ID
router.delete("/:id", isVerified, deleteSchedule);

module.exports = router;

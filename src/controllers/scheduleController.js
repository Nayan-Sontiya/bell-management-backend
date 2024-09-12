const Schedule = require("../models/Schedule"); // Adjust the path as needed

// Add a new schedule
const addSchedule = async (req, res) => {
  try {
    const { bellId, bellName, selectedDates, selectedTimes } = req.body; // Include selectedDates and selectedTimes
    const newSchedule = new Schedule({
      bellId,
      bellName,
      selectedDates, // Add selectedDates to the new schedule
      selectedTimes, // Add selectedTimes to the new schedule
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a schedule by ID
const updateSchedule = async (req, res) => {
  try {
    const { bellId, bellName, selectedDates, selectedTimes } = req.body; // Include selectedDates and selectedTimes
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { bellId, bellName, selectedDates, selectedTimes }, // Include all fields
      { new: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a schedule by ID
const deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};

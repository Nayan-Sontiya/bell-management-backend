const Bell = require("../models/Bell"); // Adjust the path as needed

// Add a new bell
const addBell = async (req, res) => {
  try {
    const { bellName, dateTime } = req.body;
    const newBell = new Bell({ bellName, dateTime });
    await newBell.save();
    res.status(201).json(newBell);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bells
const getAllBells = async (req, res) => {
  try {
    const bells = await Bell.find();
    res.status(200).json(bells);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bell by ID
const getBellById = async (req, res) => {
  try {
    const bell = await Bell.findById(req.params.id);
    if (!bell) {
      return res.status(404).json({ message: "Bell not found" });
    }
    res.status(200).json(bell);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bell by ID
const updateBell = async (req, res) => {
  try {
    const { bellName, dateTime } = req.body;
    const updatedBell = await Bell.findByIdAndUpdate(
      req.params.id,
      { bellName, dateTime },
      { new: true }
    );
    if (!updatedBell) {
      return res.status(404).json({ message: "Bell not found" });
    }
    res.status(200).json(updatedBell);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bell by ID
const deleteBell = async (req, res) => {
  try {
    const deletedBell = await Bell.findByIdAndDelete(req.params.id);
    if (!deletedBell) {
      return res.status(404).json({ message: "Bell not found" });
    }
    res.status(200).json({ message: "Bell deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBell,
  getAllBells,
  getBellById,
  updateBell,
  deleteBell,
};

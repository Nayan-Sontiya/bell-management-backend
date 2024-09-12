const Bell = require("../models/Bell"); // Adjust the path as needed

// Add a new bell
const addBell = async (req, res) => {
  try {
    const { bellId, bellName } = req.body; // Get bellId and bellName from the request body
    const newBell = new Bell({ bellId, bellName, status: "active" }); // Set status to 'active' by default
    await newBell.save();
    res.status(201).json(newBell);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bells
const getAllBells = async (req, res) => {
  try {
    // Extract status from query parameters
    const status = req.query.status;

    // Build query object based on whether a status filter is provided
    const query = status ? { status } : {};

    const bells = await Bell.find(query, {
      bellId: 1,
      bellName: 1,
      status: 1,
      _id: 1,
    }); // Fetch only specified fields
    res.status(200).json(bells);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bell by ID
const getBellById = async (req, res) => {
  try {
    const bell = await Bell.findById(req.params.id, {
      bellId: 1,
      bellName: 1,
      status: 1,
      _id: 1,
    }); // Fetch only bellId, bellName, status, and _id
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
    const { bellId, bellName, status } = req.body; // Get bellId, bellName, and status from the request body
    const updatedBell = await Bell.findByIdAndUpdate(
      req.params.id,
      { bellId, bellName, status }, // Include status in the update
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

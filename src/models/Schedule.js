// src/models/Schedule.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  bellId: { type: Schema.Types.ObjectId, ref: "Bell", required: true },
  bellName: { type: String, required: true },
  selectedDates: [{ type: Date, required: true }], // Array of selected dates
  selectedTimes: [{ type: Date, required: true }], // Array of selected times
});

module.exports = mongoose.model("Schedule", scheduleSchema);

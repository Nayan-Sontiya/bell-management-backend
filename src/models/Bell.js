// src/models/Bell.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bellSchema = new Schema({
  bellName: { type: String, required: true },
  dateTime: { type: Date, required: true },
  isFired: { type: Boolean, default: false },
});

module.exports = mongoose.model("Bell", bellSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bellSchema = new Schema({
  bellId: { type: String, required: true }, // Bell ID
  bellName: { type: String, required: true }, // Bell Name
  status: { type: String, enum: ["active", "inactive"], default: "inactive" }, // Status field with enum values
});

module.exports = mongoose.model("Bell", bellSchema);

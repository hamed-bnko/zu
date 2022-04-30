var mongoose = require("mongoose");

var speechSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    name: { type: String, trim: true },
    adjective: { type: String, trim: true },
    details: { type: String, trim: true },
    tracking: { type: String, trim: true },
    nameOFTracking: { type: String, trim: true },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("speech", speechSchema);

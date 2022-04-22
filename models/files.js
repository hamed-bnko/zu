var mongoose = require("mongoose");

var fileSchema = new mongoose.Schema(
  {
    file: { type: String, trim: true },
    title: { type: String, trim: true },
    details: { type: String, trim: true },
    tracking: { type: String, trim: true },
    nameOFTracking: { type: String, trim: true },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", fileSchema);

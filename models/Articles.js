var mongoose = require("mongoose");

var articlesSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    name: { type: String, trim: true },
    pleaceOfPublish: { type: String, trim: true },
    title: { type: String, trim: true },
    adjective: { type: String, trim: true },
    details: { type: String, trim: true },
    tracking: { type: String, trim: true },
    nameOFTracking: { type: String, trim: true },
    show: { type: Boolean, default: false },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", articlesSchema);

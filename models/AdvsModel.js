var mongoose = require("mongoose");

var advSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    details: { type: String, trim: true },
    tracking: { type: String, trim: true },
    nameOFTracking: { type: String, trim: true },
    video: { type: String, trim: true },
    file: Array,
    imagegalary: Array,
    show: { type: Boolean, default: false },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
      },
      name: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adv", advSchema);

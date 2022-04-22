var mongoose = require("mongoose");

var newsSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    video: { type: String, trim: true },
    imagegalary: Array,
    show: { type: Boolean, default: true },
    tracking: { type: String, trim: true },
    nameOFTracking: { type: String, trim: true },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
      },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("news", newsSchema);

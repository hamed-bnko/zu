var mongoose = require("mongoose");

var facultySchema = new mongoose.Schema(
  {
    // metaData
    keywords: { type: String, trim: true },
    description: { type: String, trim: true },
    facultyTitle: { type: String, trim: true },

    // Images
    image: { type: String, trim: true },
    aboutImage: { type: String, trim: true },
    programImage: { type: String, trim: true },
    aboutImage2: { type: String, trim: true },
    structureImage: { type: String, trim: true },

    // About
    Url: { type: String, trim: true },
    facultycategory: { type: String, trim: true },
    vision: { type: String, trim: true },
    message: { type: String, trim: true },
    objectives: { type: String, trim: true },
    SObjectives: { type: String, trim: true },
    videoLink: { type: String, trim: true },

    // counter
    subjects: { type: String, trim: true },
    students: { type: String, trim: true },
    rooms: { type: String, trim: true },
    alumni: { type: String, trim: true },
    members: { type: String, trim: true },

    // Contact
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    mobile: { type: String, trim: true },
    email: { type: String, trim: true },
    webLink: { type: String, trim: true },

    // social Media
    facebook: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    youtube: { type: String, trim: true },
    instagram: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("faculty", facultySchema);

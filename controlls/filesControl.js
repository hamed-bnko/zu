const path = require("path");
const fs = require("fs");
const config = require("config");
const { validationResult } = require("express-validator");

// Mongoose model
const Files = require("../models/files");

// @route   api/files/:type/type
// @desc    get all files By Type
// @access  Public
exports.getFilesByType = async (req, res, next) => {
  try {
    const files = await Files.find().sort("-updatedAt");
    res.json(files);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/files/id
// @desc    get all files by tracking
// @access  Public
exports.getFilesByTracking = async (req, res, next) => {
  try {
    const files = await Files.find({ tracking: req.params.id }).sort("-title");
    res.json(files);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/adv
// @desc    add a Adv to database
// @access  Private
exports.addfile = async (req, res) => {
  const { title, tracking, nameOFTracking } = req.body;
  try {
    const newFile = new Files({
      image: "/uploads/files/" + req.file.filename,
      title,
      tracking,
      nameOFTracking,
    });

    const file = await newFile.save();
    res.json(file);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route   api/adv/:id
// @desc    delete ADV
// @access  private
exports.DeleteFile = async (req, res) => {
  const dirname = path.join(__dirname, "../");
  try {
    let file = await Files.findById(req.params.id);
    if (!file) return res.status(400).json("file not found");
    await file.findByIdAndRemove(file._id);
    res.json({ msg: "File is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

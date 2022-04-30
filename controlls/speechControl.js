const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const Speech = require("../models/speech");

// @route   api/speech/id
// @desc    get all files by tracking
// @access  Public
exports.getSpeechByTracking = async (req, res, next) => {
  try {
    const speech = await Speech.find({ tracking: req.params.id });
    res.json(speech);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/speech
// @desc    add a Adv to database
// @access  Private
exports.addSpeech = async (req, res) => {
  const { name, adjective, details, tracking, nameOFTracking } = req.body;
  try {
    const newSpeech = new Speech({
      image: "/uploads/speech/" + req.file.filename,
      name,
      tracking,
      adjective,
      details,
      nameOFTracking,
    });
    const speech = await newSpeech.save();
    res.json(speech);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route   api/speech/:id
// @desc    delete Speech
// @access  private
exports.DeleteSpeech = async (req, res) => {
  const dirname = path.join(__dirname, "../", "../");
  try {
    let speech = await Speech.findById(req.params.id);
    if (!speech) return res.status(400).json("speech not found");
    const paths = `${dirname}/${Speech.image}`;
    if (fs.existsSync(paths)) {
      fs.unlink(`${dirname}/` + speech.image, (err) => {
        if (err) throw err;
      });
    }
    await Speech.findByIdAndRemove(speech._id);
    res.json({ msg: "speech is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

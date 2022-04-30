const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const Advs = require("../models/advsModel");
// const Users = require("../models/student");

// @route   api/adv
// @desc    get all Adv
// @access  Public
exports.getAllAdvs = async (req, res, next) => {
  try {
    const advs = await Advs.find().sort("-updatedAt");
    res.json(advs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/adv
// @desc    get all Adv
// @access  Public
const getAdvs = async (req, res, next) => {
  try {
    const advs = await Advs.find().sort("-updatedAt");
    res.json(advs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/adv
// @desc    get all Adv By Tracking
// @access  Public
exports.getAdvsByTracking = async (req, res, next) => {
  try {
    const advs = await Advs.find({ tracking: req.params.tracking }).sort(
      "-updatedAt"
    );
    res.json(advs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/adv/id
// @desc    get one Adv
// @access  Public
const getOneAdv = async (req, res, next) => {
  try {
    const adv = await Advs.findById(req.params.id);
    if (!adv) return res.status(404).json("Adv Not Found");
    res.json(adv);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};
// @route   api/adv
// @desc    add a Adv to database
// @access  Private
const addAdvs = async (req, res) => {
  var files = req.files;

  const { title, description, tracking, nameOFTracking } = req.body;

  try {
    const newAdv = new Advs({
      image: "/uploads/adv/" + files[0].filename,
      title,
      description,
      tracking,
      nameOFTracking,
      author: { id: req.user.id, name: req.user.name },
    });
    await files.slice(1, 12).forEach((f) => {
      newAdv.imagegalary.push("/uploads/adv/" + f.filename);
    });
    const adv = await newAdv.save();
    res.json(adv);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route    api/adv/:id
// @desc     update ADV
// @access   private
const UpdateAdvs = async (req, res) => {
  const { title, description, tracking, show } = req.body;

  const advFields = {};

  if (show !== undefined) advFields.show = show;
  if (title) advFields.title = title;
  if (description) advFields.description = description;
  if (tracking) advFields.tracking = tracking.value;
  if (tracking) advFields.nameOFTracking = tracking.label;

  try {
    let adv = await Advs.findById(req.params.id);

    if (!adv) return res.status(400).json("Adv not found");

    adv = await Advs.findByIdAndUpdate(req.params.id, advFields);
    adv = await Advs.findById(req.params.id);
    res.json(adv);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/adv/:id
// @desc    delete ADV
// @access  private
const DeleteAdv = async (req, res) => {
  const dirname = path.join(__dirname, "../", "../");
  try {
    let adv = await Advs.findById(req.params.id);
    fs.unlink(`${dirname}/${config.get("dire")}/` + adv.image, (err) => {
      if (err) throw err;
    });
    for (let i = 0; i < adv.imagegalary.length; i++) {
      const paths = `${dirname}/${config.get("dire")}/${adv.imagegalary[i]}`;
      if (fs.existsSync(paths)) {
        fs.unlink(
          `${dirname}/${config.get("dire")}/` + adv.imagegalary[i],
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
    if (!adv) return res.status(400).json("Adv not found");

    await Advs.findByIdAndRemove(adv._id);

    res.json({ msg: "Adv is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

exports.getAdvs = getAdvs;
exports.getOneAdv = getOneAdv;
exports.addAdvs = addAdvs;
exports.UpdateAdvs = UpdateAdvs;
exports.DeleteAdv = DeleteAdv;

const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const Faculties = require("../models/faculty/faculties");

// @route   api/faculties
// @desc    get all Faculties
// @access  Public
exports.getFaculties = async (req, res, next) => {
  try {
    const faculties = await Faculties.find({}).sort("-updatedAt");
    res.json(faculties);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/faculties/:id
// @desc    get one News
// @access  Public
exports.getOneFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculties.findOne({ Url: req.params.url });
    if (!faculty) return res.status(404).json("Faculty Not Found");
    res.json(faculty);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/news
// @desc    add a News to database
// @access  Private
exports.addFaculty = async (req, res) => {
  var files = req.files;
  const {
    facultyTitle,
    facultycategory,
    description,
    vision,
    message,
    objectives,
    SObjectives,
    keywords,
    subjects,
    students,
    rooms,
    alumni,
    members,
    address,
    phone,
    mobile,
    email,
    webLink,
    facebook,
    linkedin,
    twitter,
    youtube,
    instagram,
    videoLink,
    Url,
  } = req.body;
  try {
    const newFaculty = new Faculties({
      image: "/uploads/faculty/" + files[0].filename,
      aboutImage: "/uploads/faculty/" + files[1].filename,
      programImage: "/uploads/faculty/" + files[2].filename,
      aboutImage2: "/uploads/faculty/" + files[3].filename,
      structureImage: "/uploads/faculty/" + files[4].filename,
      vision,
      message,
      objectives,
      SObjectives,
      facultyTitle,
      facultycategory,
      description,
      keywords,
      subjects,
      students,
      rooms,
      alumni,
      members,
      address,
      phone,
      mobile,
      email,
      webLink,
      facebook,
      linkedin,
      twitter,
      youtube,
      instagram,
      videoLink,
      Url,
    });

    const faculty = await newFaculty.save();
    res.json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route    api/news/:id
// @desc     update News
// @access   private
exports.UpdateFaculty = async (req, res) => {
  const {
    facultyTitle,
    facultycategory,
    description,
    vision,
    message,
    objectives,
    SObjectives,
    keywords,
    subjects,
    students,
    rooms,
    alumni,
    members,
    address,
    phone,
    mobile,
    email,
    webLink,
    facebook,
    linkedin,
    twitter,
    youtube,
    instagram,
    videoLink,
    Url,
  } = req.body;

  const facultyFields = {};

  if (facultyTitle) facultyFields.facultyTitle = facultyTitle;
  if (facultycategory) facultyFields.facultycategory = facultycategory;
  if (description) facultyFields.description = description;
  if (vision) facultyFields.vision = vision;
  if (message) facultyFields.message = message;
  if (objectives) facultyFields.objectives = objectives;
  if (SObjectives) facultyFields.SObjectives = SObjectives;
  if (keywords) facultyFields.keywords = keywords;
  if (subjects) facultyFields.subjects = subjects;
  if (students) facultyFields.students = students;
  if (rooms) facultyFields.rooms = rooms;
  if (alumni) facultyFields.alumni = alumni;
  if (members) facultyFields.members = members;
  if (address) facultyFields.address = address;
  if (phone) facultyFields.phone = phone;
  if (mobile) facultyFields.mobile = mobile;
  if (email) facultyFields.email = email;
  if (webLink) facultyFields.webLink = webLink;
  if (facebook) facultyFields.facebook = facebook;
  if (linkedin) facultyFields.linkedin = linkedin;
  if (twitter) facultyFields.twitter = twitter;
  if (youtube) facultyFields.youtube = youtube;
  if (instagram) facultyFields.instagram = instagram;
  if (videoLink) facultyFields.videoLink = videoLink;
  if (Url) facultyFields.Url = Url;

  try {
    let faculty = await Faculties.findById(req.params.id);
    if (!faculty) return res.status(400).json("Faculty not found");

    faculty = await Faculties.findByIdAndUpdate(req.params.id, facultyFields);
    faculty = await Faculties.findById(req.params.id);
    res.json(faculty);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/news/:id
// @desc    delete News
// @access  private
exports.DeleteFaculty = async (req, res) => {
  const dirname = path.join(__dirname, "../");
  try {
    let faculty = await Faculties.findById(req.params.id);
    fs.unlink(`${dirname}/${config.get("dire")}/` + faculty.image);

    if (!faculty) return res.status(400).json("Adv not found");

    await Faculties.findByIdAndRemove(faculty._id);
    res.json({ msg: "Faculty is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

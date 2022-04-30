const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const Departments = require("../models/faculty/department");

// @route   api/departments
// @desc    get all departments
// @access  Public
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Departments.find({
      tracking: req.params.url,
    }).sort("-updatedAt");
    res.json(departments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/departments/:id
// @desc    get one Department
// @access  Public
exports.getOneDepartment = async (req, res, next) => {
  try {
    const department = await Departments.findOne({ Url: req.params.url });
    if (!department) return res.status(404).json("department Not Found");
    res.json(department);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/departments
// @desc    add a departments to database
// @access  Private
exports.addDepartment = async (req, res) => {
  var files = req.files;
  const {
    keywords,
    description,
    title,
    tracking,
    nameOFTracking,
    Url,
    vision,
    message,
    objectives,
    videoLink,
    studySystem,
    studyProgram,
    graduationProject,
    subjects,
    students,
    rooms,
    alumni,
    members,
    studyYears,
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
  } = req.body;
  try {
    const newDepartment = new Departments({
      image: "/uploads/department/" + files[0].filename,
      headImage: "/uploads/department/" + files[1].filename,
      vision,
      message,
      objectives,
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
      Url: tracking + "-" + Url,
      title,
      tracking,
      nameOFTracking,
      studySystem,
      studyProgram,
      graduationProject,
      studyYears,
    });
    console.log(newDepartment);
    const department = await newDepartment.save();
    res.json(department);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route    api/departments/:id
// @desc     update departments
// @access   private
exports.UpdateDepartment = async (req, res) => {
  const {
    keywords,
    description,
    title,
    tracking,
    nameOFTracking,
    Url,
    vision,
    message,
    objectives,
    videoLink,
    studySystem,
    studyProgram,
    graduationProject,
    subjects,
    students,
    rooms,
    alumni,
    members,
    studyYears,
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
  } = req.body;

  const departmentFields = {};

  if (title) departmentFields.title = title;
  if (studySystem) departmentFields.studySystem = studySystem;
  if (description) departmentFields.description = description;
  if (vision) departmentFields.vision = vision;
  if (message) departmentFields.message = message;
  if (objectives) departmentFields.objectives = objectives;
  if (studyProgram) departmentFields.studyProgram = studyProgram;
  if (keywords) departmentFields.keywords = keywords;
  if (subjects) departmentFields.subjects = subjects;
  if (students) departmentFields.students = students;
  if (rooms) departmentFields.rooms = rooms;
  if (alumni) departmentFields.alumni = alumni;
  if (members) departmentFields.members = members;
  if (address) departmentFields.address = address;
  if (phone) departmentFields.phone = phone;
  if (mobile) departmentFields.mobile = mobile;
  if (email) departmentFields.email = email;
  if (webLink) departmentFields.webLink = webLink;
  if (facebook) departmentFields.facebook = facebook;
  if (linkedin) departmentFields.linkedin = linkedin;
  if (twitter) departmentFields.twitter = twitter;
  if (youtube) departmentFields.youtube = youtube;
  if (instagram) departmentFields.instagram = instagram;
  if (videoLink) departmentFields.videoLink = videoLink;
  if (Url) departmentFields.Url = Url;
  if (tracking) departmentFields.tracking = tracking;
  if (nameOFTracking) departmentFields.nameOFTracking = nameOFTracking;
  if (graduationProject) departmentFields.graduationProject = graduationProject;
  if (studyYears) departmentFields.studyYears = studyYears;

  try {
    let department = await Departments.findById(req.params.id);
    if (!department) return res.status(400).json("department not found");

    department = await Departments.findByIdAndUpdate(
      req.params.id,
      departmentFields
    );
    department = await Departments.findById(req.params.id);
    res.json(department);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/departments/:id
// @desc    delete departments
// @access  private
exports.DeleteDepartment = async (req, res) => {
  const dirname = path.join(__dirname, "../", "../");
  try {
    let department = await Departments.findById(req.params.id);
    if (!department) return res.status(400).json("Department not found");

    fs.unlink(`${dirname}/${config.get("dire")}/` + department.image);
    fs.unlink(`${dirname}/${config.get("dire")}/` + department.headImage);

    await Departments.findByIdAndRemove(department._id);
    res.json({ msg: "department is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

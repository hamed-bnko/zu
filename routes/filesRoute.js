const express = require("express");
const router = express.Router();
const path = require("path");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const config = require("config");
const multer = require("multer");
const {
  getFilesByTracking,
  getFilesByType,
  addfile,
  DeleteFile,
} = require("../controlls/filesControl");

//===============
//upload image
//===============
const dirname = path.join(__dirname, "../");
const storage = multer.diskStorage({
  destination: `${dirname}/${config.get("dire")}/uploads/files/`,
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // allow files
  const filetypes = / |txt|doc|pdf|gif /;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime types
  const mimetype = filetypes.test(file.mimetype);

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error : Docs Only");
  }
}

// @route   api/adv
// @desc    get all Adv by department
router.get("/", getFilesByType);

// @route   api/adv/id
// @desc    get one Adv
router.get("/:id", getFilesByTracking);

// @route   api/adv
// @desc    add a Adv to database
router.post("/", [upload.single("file"), auth], addfile);

// @route   api/adv/:id
// @desc    delete ADV
router.delete("/:id", auth, DeleteFile);

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const config = require("config");
const multer = require("multer");
const {
  getAdvs,
  getAdvsByTracking,
  getOneAdv,
  addAdvs,
  UpdateAdvs,
  DeleteAdv,
  getAllAdvs,
} = require("../controlls/AdvsControl");

//===============
//upload image
//===============
const dirname = path.join(__dirname, "../");
const storage = multer.diskStorage({
  destination: `${dirname}/${config.get("dire")}/uploads/adv/`,
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
  const filetypes = / |doc|pdf|jpeg|jpg|png|gif /;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime types
  const mimetype = filetypes.test(file.mimetype);

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error : Images Only");
  }
}
// @route   api/adv
// @desc    get all Adv
// router.get("/", getAllAdvs);

// @route   api/adv
// @desc    get all Adv by department
router.get("/", getAdvs);

// @route   api/adv
// @desc    get all Adv by department
router.get("/tracking/:tracking", getAdvsByTracking);

// @route   api/adv/id
// @desc    get one Adv
router.get("/:id", getOneAdv);

// @route   api/adv
// @desc    add a Adv to database
router.post("/", [upload.array("advImage", 12), auth], addAdvs);
// @route    api/adv/:id
// @desc     update ADV
router.put("/:id", auth, UpdateAdvs);

// @route   api/adv/:id
// @desc    delete ADV
router.delete("/:id", auth, DeleteAdv);

module.exports = router;

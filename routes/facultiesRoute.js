const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const config = require("config");
const multer = require("multer");
const {
  getFaculties,
  getOneFaculty,
  addFaculty,
  UpdateFaculty,
  DeleteFaculty,
} = require("../controlls/facultiesControl");

//===============
//upload image
//===============
const dirname = path.join(__dirname, "../","../");
const storage = multer.diskStorage({
  destination: `${dirname}/${config.get("dire")}/uploads/faculty/`,
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
// @route   api/news
// @desc    get all Newses
router.get("/", getFaculties);

// @route   api/news/id
// @desc    get one News
router.get("/:url", getOneFaculty);

// @route   api/news
// @desc    add a News to database
router.post("/", [upload.array("facultyImage", 6), auth], addFaculty);
// @route    api/news/:id
// @desc     update News
router.put("/:id", auth, UpdateFaculty);

// @route   api/news/:id
// @desc    delete News
router.delete("/:id", auth, DeleteFaculty);

module.exports = router;

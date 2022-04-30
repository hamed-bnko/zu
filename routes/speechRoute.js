const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const config = require("config");
const multer = require("multer");
const {
  getSpeechByTracking,
  addSpeech,
  DeleteSpeech,
} = require("../controlls/speechControl");

//===============
//upload image
//===============
const dirname = path.join(__dirname, "../", "../");
const storage = multer.diskStorage({
  destination: `${dirname}/uploads/speech/`,
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
    cb("Error : Docs Only");
  }
}

// @route   api/adv/id
// @desc    get one Adv
router.get("/:id", getSpeechByTracking);

// @route   api/adv
// @desc    add a Adv to database
router.post("/", [upload.single("file"), auth], addSpeech);

// @route   api/adv/:id
// @desc    delete ADV
router.delete("/:id", auth, DeleteSpeech);

module.exports = router;

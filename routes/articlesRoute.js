const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const config = require("config");
const multer = require("multer");
const {
  getArticlesByTracking,
  getArticles,
  addArticle,
  DeleteArticle,
} = require("../controlls/articlesControl");

//===============
//upload image
//===============
const dirname = path.join(__dirname, "../", "../");
const storage = multer.diskStorage({
  destination: `${dirname}/uploads/articles/`,
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

// @route   api/Articles
// @desc    get one Articles
router.get("/", getArticles);

// @route   api/Articles/id
// @desc    get one Articles
router.get("/:id", getArticlesByTracking);

// @route   api/Articles
// @desc    add a Articles to database
router.post("/", [upload.single("image"), auth], addArticle);

// @route   api/Articles/:id
// @desc    delete Articles
router.delete("/:id", auth, DeleteArticle);

module.exports = router;

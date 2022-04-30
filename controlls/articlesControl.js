const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const Articles = require("../models/Articles");

// @route   api/articles
// @desc    get all files by tracking
// @access  Public
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Articles.find();
    res.json(articles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/articles/id
// @desc    get all files by tracking
// @access  Public
exports.getArticlesByTracking = async (req, res, next) => {
  try {
    const articles = await Articles.find({ tracking: req.params.id });
    res.json(articles);
  } catch (error) {
    s;
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/articles
// @desc    add a article to database
// @access  Private
exports.addArticle = async (req, res) => {
  const {
    name,
    adjective,
    details,
    title,
    pleaceOfPublish,
    tracking,
    nameOFTracking,
  } = req.body;
  try {
    const newArticles = new Articles({
      image: "/uploads/articles/" + req.file.filename,
      name,
      tracking,
      adjective,
      details,
      pleaceOfPublish,
      title,
      nameOFTracking,
    });
    const article = await newArticles.save();
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route   api/articles/:id
// @desc    delete articles
// @access  private
exports.DeleteArticle = async (req, res) => {
  const dirname = path.join(__dirname, "../", "../");
  try {
    let article = await Articles.findById(req.params.id);
    if (!article) return res.status(400).json("article not found");
    const paths = `${dirname}/${article.image}`;
    if (fs.existsSync(paths)) {
      fs.unlink(`${dirname}/` + article.image, (err) => {
        if (err) throw err;
      });
    }
    await Articles.findByIdAndRemove(article._id);
    res.json({ msg: "article is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

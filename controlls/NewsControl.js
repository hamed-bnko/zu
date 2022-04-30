const path = require("path");
const fs = require("fs");
const config = require("config");

// Mongoose model
const News = require("../models/newsModel");
// const Users = require("../models/student");

// @route   api/news
// @desc    get all News
// @access  Public
exports.getNewss = async (req, res, next) => {
  try {
    const news = await News.find({}).sort("-updatedAt");
    res.json(news);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/news
// @desc    get all News By Tracking
// @access  Public
exports.getNewssByTracking = async (req, res, next) => {
  try {
    const news = await News.find({ tracking: req.params.tracking }).sort(
      "-updatedAt"
    );
    res.json(news);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/news/id
// @desc    get one News
// @access  Public
exports.getOneNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json("News Not Found");
    res.json(news);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};
// @route   api/news
// @desc    add a News to database
// @access  Private
exports.addNews = async (req, res) => {
  var files = req.files;
  console.log(files);
  const { title, description, tracking, nameOFTracking } = req.body;
  try {
    const newNews = new News({
      image: "/uploads/news/" + files[0].filename,
      title,
      description,
      tracking,
      nameOFTracking,
      author: { id: req.user.id, name: req.user.name },
    });

    await files.slice(1, 12).forEach((f) => {
      newNews.imagegalary.push("/uploads/news/" + f.filename);
    });
    const news = await newNews.save();
    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

// @route    api/news/:id
// @desc     update News
// @access   private
exports.UpdateNews = async (req, res) => {
  const { title, description, tracking, show } = req.body;

  const newsFields = {};

  if (show !== undefined) newsFields.show = show;
  if (title) newsFields.title = title;
  if (description) newsFields.description = description;
  if (tracking) newsFields.tracking = tracking.value;
  if (tracking) newsFields.nameOFTracking = tracking.label;

  try {
    let news = await News.findById(req.params.id);
    if (!news) return res.status(400).json("News not found");
    news = await News.findByIdAndUpdate(req.params.id, newsFields);
    news = await News.findById(req.params.id);
    res.json(news);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

// @route   api/news/:id
// @desc    delete News
// @access  private
exports.DeleteNews = async (req, res) => {
  const dirname = path.join(__dirname, "../", "../");
  try {
    let news = await News.findById(req.params.id);
    fs.unlink(`${dirname}/` + news.image, (err) => {
      if (err) throw err;
    });
    for (let i = 0; i < news.imagegalary.length; i++) {
      const paths = `${dirname}/${news.imagegalary[i]}`;
      if (fs.existsSync(paths)) {
        fs.unlink(`${dirname}/` + news.imagegalary[i], (err) => {
          if (err) throw err;
        });
      }
    }
    if (!news) return res.status(400).json("News not found");

    await News.findByIdAndRemove(news._id);

    res.json({ msg: "News is deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");

const Users = require("../../models/Admins");

// @route   GET api/auth
// @desc    Get  user
// @access  Privet
router.get("/", auth, async (req, res) => {
  var admin;
  try {
    admin = await Users.findById(req.user.id).select("-password");
    if (admin) return res.json(admin);
    return res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route   GET api/auth
// @desc    Get logged in user
// @access  Privet
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  var user;
  try {
    user = await Users.findOne({ email });
    if (!user) return res.status(400).json("not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("كلمة المرور التي ادخلتها غير صحيحة");
    }
    const payload = {
      user: {
        id: user._id,
        name: user.name,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Privet
router.post("/changepassword", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  var user;
  try {
    user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(400).json("البريد الالكتروني الذي ادخلته غير صحيح");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json("inValed Cretential");
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

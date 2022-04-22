const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Users = require("../../models/Admins");

// @route   POST api/users
// @desc    Register user
// @access  Privet
router.get("/", async (req, res) => {
  let admins;
  try {
    admins = await Users.find().select("-password -rolls ");
    res.json(admins);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Privet
router.delete("/:id", async (req, res) => {
  let admin;
  try {
    admin = await Users.findById(req.params.id);
    if (!admin) return res.status(400).json("Admin Not Found");
    admin.remove();
    res.json("admin deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Privet
router.post("/", async (req, res) => {
  const { name, email, password, roles } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User is exists" });
    }

    user = new Users({
      name,
      email,
      password,
      roles,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

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
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Privet
router.post("/fromdash", async (req, res) => {
  console.log(req.body);
  const { name, email, password, roles, faculty } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User is exists" });
    }

    user = new Users({
      name,
      email,
      password,
      roles: roles.value,
      tracking: faculty.value,
      nameOFTracking: faculty.label,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    user = await Users.findOne({ email }).select("-password ");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});
module.exports = router;

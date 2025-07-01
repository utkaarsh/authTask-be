const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

authRouter.post("/register", async (req, res) => {
  const { name, email, password, location } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password: hashed,
      location,
    });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

authRouter.get("/me", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = authRouter;

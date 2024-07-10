// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      res.send('User logged in');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

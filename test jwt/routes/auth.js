const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/keys');
const { findUserByEmail, addUser } = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await addUser(email, password);
  res.status(201).json({ message: 'User registered successfully', userId: user.id });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Protected Route
router.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.status(200).json({ message: 'Access granted', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;

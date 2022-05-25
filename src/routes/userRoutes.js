const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');

const userRoutes = express.Router();

userRoutes.get('/register', validateUser, async (req, res) => {
  // res.send('Register route is working');
  const { email, password } = req.body;

  const plainTextPassword = password;
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  console.log('hashedPassword===', hashedPassword);

  const newUser = {
    email,
    password: hashedPassword,
  };
});

module.exports = userRoutes;

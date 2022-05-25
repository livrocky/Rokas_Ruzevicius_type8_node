const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');
const { addUserToDb } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.get('/register', validateUser, async (req, res) => {
  // res.send('Register route is working');
  const { fullName, email, password } = req.body;

  const plainTextPassword = password;
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  console.log('hashedPassword===', hashedPassword);

  const newUser = {
    fullName,
    email,
    password: hashedPassword,
  };
  const insertResult = await addUserToDb(newUser.fullName, newUser.email, newUser.password);
  console.log('insertResult===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }
  res.status(201).json('user created');
});

module.exports = userRoutes;

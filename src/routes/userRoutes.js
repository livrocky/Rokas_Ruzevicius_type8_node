const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const { validateUser, validateUserLogin } = require('../middleware');
const { addUserToDb, findUserByEmail } = require('../model/userModel');
const { dbConfig, jwtSecret } = require('../config');

const userRoutes = express.Router();

userRoutes.get('/users', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('connected');
    const sql = 'SELECT * FROM users';
    const [rows] = await connection.execute(sql);
    res.json(rows);
  } catch (error) {
    console.log('home route error ===', error);
    res.status(500).json('something went wrong');
  } finally {
    // atsijungti
    if (connection) connection.end();
  }
});

// REGISTER //

userRoutes.post('/register', validateUser, async (req, res) => {
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

// LOGIN //

userRoutes.post('/login', validateUserLogin, async (req, res) => {
  const receivedEmail = req.body.email;
  const receivedPassword = req.body.password;

  const foundUser = await findUserByEmail(receivedEmail);
  console.log('foundUser===', foundUser);
  if (!foundUser) {
    res.status(400).json('email or passowrd not found (email)');
    return;
  }
  if (!bcrypt.compareSync(receivedPassword, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  console.log('token===', token);
  res.json({ success: true, token });
});

module.exports = userRoutes;

const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../middleware');
const { addUserToDb } = require('../model/userModel');
const { dbConfig } = require('../config');

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

module.exports = userRoutes;

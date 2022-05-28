/* eslint-disable camelcase */
const express = require('express');
const { validateUser } = require('../middleware');
const controller = require('../controller/userController');

const userRoutes = express.Router();

// userRoutes.get('/users', async (req, res) => {
//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);
//     console.log('connected');
//     const sql = 'SELECT * FROM users';
//     const [rows] = await connection.execute(sql);
//     res.json(rows);
//   } catch (error) {
//     console.log('home route error ===', error);
//     res.status(500).json('something went wrong');
//   } finally {
//     // atsijungti
//     if (connection) connection.end();
//   }
// });

// REGISTER //

userRoutes.post('/register', validateUser, controller.userRegister);

// LOGIN //

userRoutes.post('/login', validateUser, controller.userLogin);

module.exports = userRoutes;

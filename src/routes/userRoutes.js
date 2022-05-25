const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/register', async (req, res) => {
  res.send('Register route is working');
});

module.exports = userRoutes;

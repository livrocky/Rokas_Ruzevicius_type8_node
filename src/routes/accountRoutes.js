/* eslint-disable camelcase */
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const accountRoutes = express.Router();

accountRoutes.post('/accounts', async (req, res) => {
  let connection;
  try {
    const { group_id, user_id } = req.body;
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?)';
    const [rows] = await conn.execute(sql, [group_id, user_id]);
    console.log('connected');
    res.json(rows);
  } catch (error) {
    res.status(500).json('error in post account');
  } finally {
    await connection?.end();
  }
});

module.exports = accountRoutes;

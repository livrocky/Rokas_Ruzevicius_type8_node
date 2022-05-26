const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDb(fullName, email, password) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = `
        INSERT INTO users(fullName, email, password) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(sql, [fullName, email, password]);
    return result;
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
  } finally {
    connection?.end();
  }
}

async function findUserByEmail(email) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = `
        SELECT * FROM users WHERE email = ?`;
    const [result] = await connection.execute(sql, [email]);
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
  } finally {
    connection?.end();
  }
}

module.exports = {
  addUserToDb,
  findUserByEmail,
};
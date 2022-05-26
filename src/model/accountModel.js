// /* eslint-disable camelcase */
// const mysql = require('mysql2/promise');
// const { dbConfig } = require('../config');

// async function executeDb(sql, dataToDBArr) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const [result] = await conn.execute(sql, dataToDBArr);
//     return result;
//   } catch (error) {
//     console.log('error executeDb', error);
//     throw new Error('error executeDb');
//   } finally {
//     conn?.end();
//   }
// }

// async function insertAccountDb(newAccObj) {
//   const { group_id, user_id } = newAccObj;
//   // executeDb
//   const sql = `
//   INSERT INTO accounts (group_id, user_id) VALUES (?, ?)
//     `;
//   return executeDb(sql, [group_id, user_id]);
// }

// module.exports = {
//   insertAccountDb,
// };

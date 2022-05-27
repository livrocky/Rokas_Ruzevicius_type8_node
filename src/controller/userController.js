const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUserToDb, findUserByEmail } = require('../model/userModel');
const { jwtSecret } = require('../config');

// REGISTER //

async function userRegister(req, res) {
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
}

// LOGIN

async function userLogin(req, res) {
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
}

// EXPORT //

module.exports = {
  userRegister,
  userLogin,
};

/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// middleware helper
function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync===', error);
    res.status(400).json(error.details);
  }
}

module.exports = {
  showBody,
};

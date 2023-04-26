const express = require('express');
const emailValidation = require('../Middlewares/emailValidation');
const passwordValidation = require('../Middlewares/passwordValidation');
const randonToken = require('../utils/randonToken');

const login = express.Router();

login.post('/', emailValidation, passwordValidation, async (__req, res) => {
    const token = randonToken(16);
    return res.status(200).json({ token });
  });

module.exports = login;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// collection
const User = require('../models/User');

exports.signupController = async (req, res) => {
  const { fullName, emailId, username, password, conformPassword } = req.body;

  if (!fullName || !emailId || !username || !password || !conformPassword) {
    return await res.status(404).json({ message: 'Field is empty' });
  }

  const isUsername = await User.findOne({ username });

  if (isUsername) {
    return await res.status(404).json({ message: 'username is already exists' });
  }

  const isEmail = await User.findOne({ emailId });

  if (isEmail) {
    return await res.status(404).json({ message: 'email is already have a account' });
  }

  if (password !== conformPassword) {
    return await res.status(404).json({ message: 'password and conform password is not match' });
  }

  const hashPassword = await bcrypt.hash(password, 13);

  const user = new User({ fullName, emailId, username, hashPassword });

  await user.save();

  await res.status(201).json({
    message: 'sign up successful',
  });
};

exports.signinController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return await res.status(404).json({ message: 'username and password is empty' });
  }

  // fetching user from database
  const account = await User.findOne({ username });

  if (!account) {
    return await res.status(401).json({ message: 'username and password invalid' });
  }

  const isCompare = await bcrypt.compare(password, account.hashPassword);

  if (!isCompare) {
    return await res.status(401).json({ message: 'username and password invalid' });
  }

  const { _id } = account;

  const token = await jwt.sign({ userId: _id }, process.env.JWT_TOKEN, {
    expiresIn: '30m',
  });

  return await res.status(201).json({
    message: 'login successful',
    token,
  });
};

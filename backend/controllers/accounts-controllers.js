const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// collection
const User = require('../models/User');

const sendEmail = require('../utils/sendEmail');

const SALT = 13;

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

  const hashPassword = await bcrypt.hash(password, SALT);

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

exports.forgotController = async (req, res) => {
  const expires = '5m';

  const { email } = req.body;

  const user = await User.findOne({ emailId: email });

  if (!user) return await res.status(400).json({ message: 'email is not a valid' });

  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: expires,
    }
  );

  const subject = 'blogs forgot password';

  const html = `
  <div>
    <h1>forgot Password</h1>

    <p>This link is ${expires}</p>

    <div>
      to change password <a href="http://localhost:3000/forgot/${token}" >Click Here</a>
    </div>
  </div>
  `;

  const doneSendEmail = await sendEmail(email, subject, html);

  if (!doneSendEmail) {
    return await res.status(400).json({ message: 'something is wrong' });
  }

  await res.status(200).json({ message: 'email is send successfully please check your email' });
};

exports.putForgotController = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const { _id } = await jwt.verify(token, process.env.JWT_TOKEN);

    if (!_id) return await res.status(400).json({ message: 'something is wrong' });

    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await User.findByIdAndUpdate(_id, { $set: { hashPassword } });

    if (!user) return await res.status(400).json({ message: 'user is not a valid' });

    await res.status(200).json({ message: 'password is change successful' });
  } catch (error) {
    return await res.status(400).json({ message: 'something is wrong' });
  }
};

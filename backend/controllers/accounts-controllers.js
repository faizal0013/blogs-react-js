const bcrypt = require('bcryptjs');

// collection
const User = require('../models/User');

exports.signupController = async (req, res) => {
  const { fullName, emailId, username, password } = req.body;

  if (!fullName || !emailId || !username || !password) {
    return await res.status(404).json({ message: 'is emty' });
  }

  const hashPassword = await bcrypt.hash(password, 13);

  const user = new User({ fullName, emailId, username, hashPassword });

  await user.save();

  await res.status(201).json({
    message: 'done',
  });
};

exports.signinController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return await res.status(404).json({ message: 'is emty' });
  }

  // fetching user from database
  const account = await User.findOne({ username });

  if (!account) {
    return await res.status(401).json({ message: 'User not found' });
  }

  const isCompare = await bcrypt.compare(password, account.hashPassword);

  if (isCompare) {
    const { _id } = account;

    return await res.status(201).json({
      message: 'login',
      _id,
    });
  }

  res.status(401).json({ message: 'not auth' });
};

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];

      const decode = jwt.verify(token, process.env.JWT_TOKEN);

      req.userId = decode.userId;

      return next();
    }

    return await res.status(400).json({ message: 'something is wrong' });
  } catch (error) {
    return await res.status(400).json({ message: 'something is wrong' });
  }
};

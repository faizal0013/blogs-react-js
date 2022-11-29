//multer
const multer = require('multer');

const randomstring = require('randomstring');

//helpers
const { UPLOADFILEPATH } = require('../helpers/helpers');

console.log(UPLOADFILEPATH);

// multer diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADFILEPATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${randomstring.generate()}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;

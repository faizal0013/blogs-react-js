const fs = require('fs');
const path = require('path');

const UPLOADFILEPATH = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(UPLOADFILEPATH)) {
  fs.mkdirSync(UPLOADFILEPATH);
}

exports.UPLOADFILEPATH = UPLOADFILEPATH;

exports.STATICIMAGEURL = path.join(__dirname, '..', 'public');

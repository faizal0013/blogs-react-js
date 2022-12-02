require('dotenv').config();

const { createTransport } = require('nodemailer');

const sendEmail = async (email, subject, html) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

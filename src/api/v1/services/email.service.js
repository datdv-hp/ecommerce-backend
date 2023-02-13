const nodemailer = require('nodemailer');
const { transporter, mailOptions } = require('../configs/nodemailer.config');

const sendEmail = async (data) => {
  try {
    let info = await transporter.sendMail(mailOptions(data));
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { sendEmail };

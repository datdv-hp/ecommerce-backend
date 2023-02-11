const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

const mailOptions = (data) => {
  return {
    from: '"Hey 👻" <dat-shop@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: `<!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Send Mail Using Nodemailer</title>
        <style type="text/css">
            body { font-family: 'Roboto', sans-serif; }
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: white;" leftmargin="0">
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="white">
            <tr>
                <td>
                    <table style="max-width:670px;  margin:0 auto; padding:50px;" border="0"
                        align="left" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:40px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td style="font-size: 20px; font-weight: 500;">
                            Hello,<br><br>
                            Please follow this link to reset your password. This link is valid till 10 minutes from now..<br/><br/>
                            <a href='http://localhost:8000/api/v1/reset-password/${data.resetToken}'>Click here to reset password!</a> <br/>
                            <br/> <br/>
                            Happy Learning!!! 😊
                            Happy Coding!!! 😇<br/><br/>
                        </td>
                        </tr>
                        <tr>
                            <td style="height:40px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
`,
  };
};

module.exports = { transporter, mailOptions };

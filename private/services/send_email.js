const nodemailer = require("nodemailer");
const EMAILBODY = require("../helpers/mail_body");

const sendMail = (email, code) =>
  new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "myecentials2021@gmail.com",
        pass: "jguxhutsrymrloxf",
      },
      secure: true,
      tls: {
        servername: "gmail.com",
      },
    });

    let mailOptions = {
      from: "replyus.app@gmail.com",
      to: `${email}`,
      subject: "Ecentials",
      html: EMAILBODY(code, "imgs/logo_ios.png", "not-me-password-reset"),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve("ok");
    });
  });


module.exports = sendMail;

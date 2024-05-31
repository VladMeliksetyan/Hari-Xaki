const nodemailer = require("nodemailer");
const { User } = require("../../models");

const transporter = nodemailer.createTransport({
  service: "mail.ru",
  auth: {
    user: "harixaqi@mail.ru",
    pass: "XUPWHwTjy0e5itFLzHg0",
  },
});

async function mailsenderReg(req, res, next) {
  try {
    const email = req.body.email;
    const verificationCode = Math.floor(10000 + Math.random() * 90000);
    req.code = verificationCode;
    const info = await transporter.sendMail({
      from: "<harixaqi@mail.ru>",
      to: `${email}`,
      subject: "registration verification code",
      text: `${verificationCode.toString()}`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }

  next();
}
async function mailsenderLogin(req, res, next) {
  try {
    const email = req.body.email;
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      const verificationCode = Math.floor(10000 + Math.random() * 90000);
      req.code = verificationCode;
      const info = await transporter.sendMail({
        from: "<harixaqi@mail.ru>",
        to: `${email}`,
        subject: "recovery verification code",
        text: `${verificationCode.toString()}`,
      });
      console.log("Message sent: %s", info.messageId);
      res.send("email recived");
      next();
    } else {
      return res.status(400).send({
        message: "This is an error!",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { mailsenderLogin, mailsenderReg };

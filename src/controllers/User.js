const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const createResponse = require("../utils/create-response");
const { uuid } = require("uuidv4");

const getUserData = async (req, res) => {
  try {
    const { id } = req.user;
    const foundUser = await User.findOne({ where: { id } });

    if (foundUser) {
      res.send(foundUser).status(201);
    } else {
      res.send("user is not found ").status(400);
    }
  } catch (error) {
    console.log(error);
  }
};
const registerUser = async (req, res, next) => {
  const { lastName, firstName, email, password, referral, username, gender } =
    req.body;
  const verificationCode = req.code;
  const id = uuid();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUserEmail = await User.findOne({ where: { email } });
    const { dataValues } = await User.findOne({
      where: { username: referral },
    });
    const existingUserUsername = await User.findOne({ where: { username } });
    if (existingUserEmail || existingUserUsername) {
      res.status(409).json(
        createResponse({
          code: 409,
          message: "User Already exists with this email or username",
        })
      );
    } else {
      await User.create({
        id,
        lastName,
        firstName,
        email,
        password: hashedPassword,
        referral: dataValues.id,
        username,
        code: verificationCode,
        gender,
      });

      res.status(201).json(createResponse({ message: "User created" }));
    }
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password, username } = req.body;
  let user;
  try {
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (username) {
      user = await User.findOne({ where: { username } });
    }
    const foundUser = user?.dataValues;
    if (foundUser) {
      const token = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET);
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        res.status(200).send(token);
      } else {
        return res.status(400).send(new Error("wrong password"));
      }
    } else {
      return res.status(400).send(new Error("wrong email"));
    }
  } catch (error) {
    console.log(error);
  }
};

const userVerification = async (req, res) => {
  try {
    const { code } = req.body;
    const verificatedUser = await User.findOne({ where: { code } });
    if (verificatedUser) {
      await User.update({ approved: true }, { where: { code } });
      res.send("veryfied");
    } else {
      return res.status(400).json({error: "wrong code"});
    }
  } catch (error) {
    console.log(error);
  }
};

const loginVerifyCode = async (req, res) => {
  try {
    const { email } = req.body;
    const code = req.code;
    const user = await User.findOne({ where: { email } });

    if (user) {
      await User.update({ code }, { where: { email } });
      res.send("code recived");
    } else {
      res.send("User is not found");
    }
  } catch (error) {
    console.log(error);
    res.send("veryfication faild");
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: hashedPassword }, { where: { email } });
      res.send("user password updated");
    } else {
      res.send("user is not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyRecover = async (req, res) => {
  try {
    const { code, email } = req.body;
    const RecovierdUser = await User.findOne({ where: { code, email } });
    if (RecovierdUser) {
      res.send("user recoverd");
    } else {
      return res.status(400).send(new Error("wrong code"));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userLogin,
  registerUser,
  userVerification,
  loginVerifyCode,
  changePassword,
  verifyRecover,
  getUserData,
};

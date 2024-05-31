const { User } = require("../../models");
const createResponse = require("../utils/create-response");

const checkReferralCount = async (req, res, next) => {
  try {
    const userId = req.body.referral;
    const UserData = await User.findOne({ where: { username: userId } });
    if (!UserData) {
      res.send("there is no user youn want to referr");
      return;
    }
    const referrals = await User.findAll({
      where: { referral: UserData.dataValues.id },
    });
    const referralObjects = referrals.map((referral) =>
      referral.get({ plain: true })
    );
    if (userId != "superadmin" && referralObjects.length > 1) {
      res
        .status(403)
        .json(createResponse({ code: 403, message: "can't add referral" }));
      return;
    }
    if (req.body.email) {
      res.status(200);
      next();
    } else {
      res.send("approved").status(201);
      return;
    }
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
module.exports = { checkReferralCount };

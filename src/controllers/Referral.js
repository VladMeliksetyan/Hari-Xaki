const { User } = require("../../models");

const getUserReferrals = async (userId) => {
  if (userId == "401f8d64-9ae7-47f4-b546-4f0623ef21f3") {
    const UserReferals = await User.findAll({ where: { referral: userId } });
    const referralObjects = UserReferals.map((referral) =>
      referral.get({ plain: true })
    );
    const referralsData = referralObjects.map((referral) => {
      return {
        id: referral.id,
        firstName: referral.firstName,
        lastName: referral.lastName,
        username: referral.username,
        email: referral.email,
        gender: referral.gender,
      };
    });
    referralsData.push("superadmin");
    return referralsData;
  } else {
    const users = await User.findAll();

    const findReferrals = (currentUserId) => {
      const directReferrals = users.filter(
        (user) => user.referral === currentUserId
      );
      if (directReferrals.length === 0) {
        return [];
      }

      const referralsData = directReferrals.map((referral) => {
        const nestedReferrals = findReferrals(referral.id);
        return {
          id: referral.id,
          firstName: referral.firstName,
          lastName: referral.lastName,
          username: referral.username,
          email: referral.email,
          referrals: nestedReferrals,
          gender: referral.gender,
        };
      });

      return referralsData;
    };
    const referralsArray = findReferrals(userId);
    return referralsArray;
  }
};

const getUserReferals = async (req, res) => {
  try {
    let foundUser;
    const id = req?.user ? req.user.id : req.params.id;
    if (!req?.user) {
      const userData = await User.findOne({ where: {id} });
      foundUser = [userData];
    } else {
      foundUser = [req.user];
    }
    const users = await getUserReferrals(id);
    foundUser.push(...users);
    res.send(foundUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};


module.exports = {
  getUserReferals,
};

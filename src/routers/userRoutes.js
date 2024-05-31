const { Router } = require("express");
const {
  userLogin,
  registerUser,
  userVerification,
  loginVerifyCode,
  changePassword,
  getUserData,
  verifyRecover,
} = require("../controllers/User");
const { checkReferralCount } = require("../middleware/referralAvailability");
const { mailsenderLogin, mailsenderReg } = require("../middleware/emailSender");
const { authenticate } = require("../middleware/middleware");

const router = Router();

/**
 * Handle POST to /user/signup route.
 */
router.post("/signup", checkReferralCount, mailsenderReg, registerUser);
router.post("/verifyRegistration", userVerification);
router.post("/referralCount", checkReferralCount);
router.post("/loginMail", mailsenderLogin, loginVerifyCode);
router.post("/recoverVerify", verifyRecover);
router.get("/data", authenticate, getUserData);
router.post("/passwordChange", changePassword);
/**
 * Handle POST to /user/login route.
 */
router.post("/login", userLogin);

module.exports = router;

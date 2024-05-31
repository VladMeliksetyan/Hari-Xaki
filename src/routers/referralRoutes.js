const { Router } = require("express");
const { getUserReferals,getReferralsReferrals} = require("../controllers/Referral");
const { authenticate } = require("../middleware/middleware");

const router = Router();

/**
 * Handle POST to /user/signup route.
 */
router.get("/:id", authenticate, getUserReferals);
router.get("/referral/:id",getUserReferals)

module.exports = router;

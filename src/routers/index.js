const { Router } = require("express");
const userRoutes = require("./userRoutes");
const referralRoutes = require("./referralRoutes")

const router = Router();

router.use("/user", userRoutes);
router.use("/referral",referralRoutes)

router.use("*", (req, res) => {
  res.status(404).send("Page not found"); 
});
module.exports = router;
 
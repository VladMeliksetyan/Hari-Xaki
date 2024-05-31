const jwt = require("jsonwebtoken");
const createResponse = require("../utils/create-response");

const authenticate = (req, res, next) => {
  // take token from header
  const authHeader = req.headers["authorization"];
  // split and take only token part
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json(createResponse({ code: 401, message: "There is no token." }));
  // create token if it not exists
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json(createResponse({ code: 403, message: "Invalid token." }));
    req.user = user;
    next();
  });
};

module.exports = {authenticate};

const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    req.userId = decoded.id;

    return next();
  });
};

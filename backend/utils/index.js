const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// get config vars
dotenv.config();

// For new token
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

// For validating old token if it's expired or is wrong
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };

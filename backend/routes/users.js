var express = require("express");
var router = express.Router();
var User = require("../models/users");
const { generateAccessToken, authenticateToken } = require("../utils");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/signUp", function (req, res, next) {
  User.create(req.body)
    .then(
      (result) => {
        console.log("User has been Added ", result);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const token = generateAccessToken({ username: req.body.username });
        res.json({ user: result, token });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
router.get("/viewUsers", authenticateToken, function (req, res, next) {
  User.find()
    .sort("name")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username, password: req.body.password })
    .sort("name")
    .exec(function (error, result) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      const token = generateAccessToken({ username: req.body.username });

      res.json({ user: result, token }); // good work wait
    });
});

module.exports = router;

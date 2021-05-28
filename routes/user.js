const passport = require("passport");
const { verifyUser, getToken } = require("../authenticate");
const User = require("../models/user");
const router = require("express").Router();
const mongoose = require("mongoose");

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  res.status(200).json({ success: true, token, user: req.user });
});

router.post("/userinfopost", verifyUser, async (req, res, next) => {
  console.log(req.body);
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { typingmatches: req.body.typingmatches } },
    (err, resp) => {
      if (err) res.send({ success: false });
      else res.send({ success: true });
    }
  );
});

router.post("/signup", (req, res, next) => {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(200).json(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          const token = getToken({ _id: user._id });
          console.log(user, "hello");
          res.status(200).json({ success: true, token, user: req.user });
        });
      }
    }
  );
});
module.exports = router;

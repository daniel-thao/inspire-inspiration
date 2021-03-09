const router = require("express").Router();
// Load User model
const db = require("../models");

router.get("/", (req, res) => {
  res.status(200).json({message: "Hey"});
});

router.put("/exists", (req, res) => {
  console.log(`\n\n ${req.body.email} \n\n`);
  db.Users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.send("User already exists");
    } else {
      res.json(user);
    }
  });
});

router.post("/register", (req, res) => {
  res.json(req.body);
  db.Users.create({
    name: req.body.given_name ? req.body.given_name : req.body.name,
    email: req.body.email,
    sub: req.body.sub,
    goals: [],
  }).then((user) => {
    res.json(user);
  });
});

module.exports = router;

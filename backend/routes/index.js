const express = require("express");
const router = express.Router();
// const app = require("express")();

// Just add more router.(whatevers) here and they will be added to the pool of routes
router.use("/api/users", require("./users"));
// router.use("/api/goals", require("./goals"));
// router.use("/test", require("./test"));

module.exports = router;


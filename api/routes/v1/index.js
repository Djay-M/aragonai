const express = require("express");
const UserRoute = require("./users.route");
const router = express.Router();

// Health Check API
router.get("/status", function (req, res, next) {
  return res.json({ code: 200, message: "Server Running, OK!" });
});

router.use("/users", UserRoute);

module.exports = router;

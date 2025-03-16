const express = require("express");
const UserRoute = require("./users.route");
const BoardsRoute = require("./boards.route");
const router = express.Router();

// Health Check API
router.get("/status", function (req, res, next) {
  return res.json({ code: 200, message: "Server Running, OK!" });
});

router.use("/users", UserRoute);
router.use("/boards", BoardsRoute);

module.exports = router;

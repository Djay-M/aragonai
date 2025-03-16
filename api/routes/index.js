const express = require("express");
const router = express.Router();

// Health Check API
router.get("/status", function (req, res, next) {
  return res.json({ code: 200, message: "Server UP AND Running, OK!" });
});

module.exports = router;

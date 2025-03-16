const path = require("path");
require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
});

module.exports = {
  env: process.env.ENV || "dev",
  port: process.env.PORT,
  jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  taskStatus: ["To Do", "Doing", "Done"],
};

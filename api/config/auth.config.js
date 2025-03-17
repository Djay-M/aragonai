const jwt = require("jsonwebtoken");
const { jwtAccessTokenSecret, jwtRefreshTokenSecret } = require("./vars");
const APIError = require("../utils/APIErrors");
const httpStatus = require("http-status");

exports.genrateJwt = (user) => jwt.sign(user, jwtAccessTokenSecret);

exports.verifyJwt = (token) => {
  try {
    const res = jwt.verify(token, jwtAccessTokenSecret);
    return res;
  } catch (error) {
    throw new APIError({
      code: httpStatus.UNAUTHORIZED,
      message: "Not a Valid Token",
    });
  }
};

const { verifyJwt } = require("../config/auth.config");
const APIError = require("../utils/APIErrors");
const { Users } = require("../models");

exports.authorize = () => async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
      return next(
        new APIError({
          status: 404,
          message: "Token not found in the Headers",
        })
      );
    }
    const token = jwtToken.split(" ")[1];
    const user = verifyJwt(token);
    if (user) {
      const dbUser = await Users.findByPk(user.id, { raw: true });

      if (dbUser?.archived) {
        return next(
          new APIError({
            status: 400,
            message: `User Delelted, Token Not Valid`,
          })
        );
      }

      req.user = dbUser;
      return next();
    }

    next(
      new APIError({
        status: 404,
        message: `Token Not Valid`,
      })
    );
  } catch (error) {
    next(error);
  }
};

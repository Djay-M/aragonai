const _ = require("lodash");
const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { genrateJwt } = require("../config/auth.config");
const { Users } = require("../models");
const APIError = require("../utils/APIErrors");

exports.listAllUsers = async (req, res, next) => {
  try {
    const { sortBy, order, searchKey, searchVal } = req.query;
    const users = await Users.findAll({
      ...(searchKey &&
        searchVal && {
          where: {
            [searchKey]:
              searchKey == "id"
                ? searchVal
                : {
                    [Op.like]: `%${searchVal}%`,
                  },
          },
        }),
      ...(sortBy && order && { order: [[sortBy, order]] }),
    });
    return res.json({
      status: 200,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username } = req.body;

    const existingUsers = await Users.findAll({
      where: {
        [Op.or]: [{ firstName }, { lastName }, { username }],
      },
      raw: true,
    });

    if (!_.isEmpty(existingUsers)) {
      throw new APIError({
        code: httpStatus.BAD_REQUEST,
        message:
          "Duplicate User, Please choose different firstName, lastName and username",
      });
    }

    const user = await Users.create(req.body);
    return res.json({
      status: 200,
      message: "Users created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: { username, password, archived: false },
      raw: true,
    });
    if (!user) {
      throw new APIError({
        code: httpStatus.NOT_FOUND,
        message:
          "User not found(or deleted) in system, please check the user or create a new user",
      });
    }
    return res.json({
      status: 200,
      message: "Users loggedIn successfully",
      token: `JWT ${genrateJwt(user)}`,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username } = req.body;
    const user = await Users.findByPk(req.user.id);

    if (!user) {
      throw new APIError({
        code: httpStatus.NOT_FOUND,
        message: "User not found in system, please check token",
      });
    }

    await Users.update(
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(username && { username }),
      },
      {
        where: { id: req.user.id },
      }
    );

    return res.json({
      status: 200,
      message: "Users Details Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await Users.update(
      {
        archived: true,
      },
      {
        where: { id: req.user.id },
      }
    );

    return res.json({
      status: 200,
      message: "Users Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

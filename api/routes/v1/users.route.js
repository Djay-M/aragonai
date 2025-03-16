const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/users.controller");
const {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
} = require("../../validations/user.validations");
const { authorize } = require("../../middlewares/auth");

router
  .route("/")
  /**
   * @api {POST} api/v1/users/
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    authorize(),
    validate(createUser, { allowUnknown: false }),
    controller.createUser
  );

router
  .route("/getAllUsers")
  /**
   * @api {GET} api/v1/users/getAllUsers
   * @apiDescription Fetch all users from user table
   * @apiVersion 1.0.0
   * @apiName FetchAllUsers
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(
    authorize(),
    validate(getAllUsers, { allowUnknown: false }),
    controller.listAllUsers
  );

router
  .route("/login")
  /**
   * @api {GET} api/v1/users/login
   * @apiDescription login a user
   * @apiVersion 1.0.0
   * @apiName LoginUser
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(validate(loginUser, { allowUnknown: false }), controller.loginUser);

router
  .route("/updateUser")
  /**
   * @api {GET} api/v1/users/updateUser
   * @apiDescription Update user's details like firstName lastName and userName
   * @apiVersion 1.0.0
   * @apiName UpdateUser
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .put(
    authorize(),
    validate(updateUser, { allowUnknown: false }),
    controller.updateUser
  );

router
  .route("/deleteUser")
  /**
   * @api {GET} api/v1/users/deleteUser
   * @apiDescription User deletes his account
   * @apiVersion 1.0.0
   * @apiName DeleteUser
   * @apiGroup Users
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .delete(authorize(), controller.deleteUser);

module.exports = router;

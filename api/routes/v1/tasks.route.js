const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/tasks.controller");
const { authorize } = require("../../middlewares/auth");
const {
  createTasks,
  updateTasks,
  getAllTasks,
} = require("../../validations/tasks.validations");

router
  .route("/")
  /**
   * @api {POST} api/v1/tasks/
   * @apiDescription Create a new tasks
   * @apiVersion 1.0.0
   * @apiName CreateBoard
   * @apiGroup Tasks
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    authorize(),
    validate(createTasks, { allowUnknown: false }),
    controller.creatTasks
  );

router
  .route("/getAllTasks")
  /**
   * @api {GET} api/v1/tasks/getAllTasks
   * @apiDescription Fetch all tasks for the user
   * @apiVersion 1.0.0
   * @apiName FetchAllTasks
   * @apiGroup Tasks
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(
    authorize(),
    validate(getAllTasks, { allowUnknown: false }),
    controller.listAllTasks
  );

router
  .route("/getTaskById/:id")
  /**
   * @api {GET} api/v1/tasks/getBoardById/:id
   * @apiDescription Fetch a tasks from id
   * @apiVersion 1.0.0
   * @apiName fetchBoardFromId
   * @apiGroup Tasks
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.fetchTaskFromId);

router
  .route("/updateTask/:id")
  /**
   * @api {GET} api/v1/tasks/updateBoard/:id
   * @apiDescription Update a tasks details from id
   * @apiVersion 1.0.0
   * @apiName UpdateBoardFromId
   * @apiGroup Tasks
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .put(
    authorize(),
    validate(updateTasks, { allowUnknown: false }),
    controller.updatTask
  );

router
  .route("/deleteTask/:id")
  /**
   * @api {GET} api/v1/tasks/deleteBoard/:id
   * @apiDescription Delete a tasks from id
   * @apiVersion 1.0.0
   * @apiName DeleteBoard
   * @apiGroup Tasks
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .delete(authorize(), controller.deletTask);

module.exports = router;

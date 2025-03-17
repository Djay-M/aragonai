const express = require("express");
const router = express.Router();
const { celebrate: validate } = require("celebrate");
const controller = require("../../controllers/boards.controller");
const { authorize } = require("../../middlewares/auth");
const {
  createBoard,
  updateBoard,
} = require("../../validations/board.validations");

router
  .route("/")
  /**
   * @api {POST} api/v1/boards/
   * @apiDescription Create a new board
   * @apiVersion 1.0.0
   * @apiName CreateBoard
   * @apiGroup Boards
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .post(
    authorize(),
    validate(createBoard, { allowUnknown: false }),
    controller.creatBoards
  );

router
  .route("/getAllBoards")
  /**
   * @api {GET} api/v1/boards/getAllBoards
   * @apiDescription Fetch all boards for the user
   * @apiVersion 1.0.0
   * @apiName FetchAllBoards
   * @apiGroup Boards
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.listAllBoards);

router
  .route("/getBoardById/:id")
  /**
   * @api {GET} api/v1/boards/getBoardById/:id
   * @apiDescription Fetch a board from id
   * @apiVersion 1.0.0
   * @apiName fetchBoardFromId
   * @apiGroup Boards
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .get(authorize(), controller.fetchBoardFromId);

router
  .route("/updateBoard/:id")
  /**
   * @api {GET} api/v1/boards/updateBoard/:id
   * @apiDescription Update a board details from id
   * @apiVersion 1.0.0
   * @apiName UpdateBoardFromId
   * @apiGroup Boards
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .put(
    authorize(),
    validate(updateBoard, { allowUnknown: false }),
    controller.updatBoard
  );

router
  .route("/deleteBoard/:id")
  /**
   * @api {GET} api/v1/boards/deleteBoard/:id
   * @apiDescription Delete a board from id
   * @apiVersion 1.0.0
   * @apiName DeleteBoard
   * @apiGroup Boards
   * @apiPermission admin, agent
   *
   * @apiSuccess {Object} Status, message, data
   */
  .delete(authorize(), controller.deletBoard);

module.exports = router;

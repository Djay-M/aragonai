const _ = require("lodash");
const httpStatus = require("http-status");
const { Boards } = require("../models");
const APIError = require("../utils/APIErrors");

exports.listAllBoards = async (req, res, next) => {
  try {
    const boards = await Boards.findAll({
      where: { createdBy: req.user.id, archived: false },
    });
    return res.json({
      status: 200,
      message: "Boards fetched successfully",
      data: boards,
    });
  } catch (error) {
    next(error);
  }
};

exports.creatBoards = async (req, res, next) => {
  try {
    const { title } = req.body;

    const existingBoard = await Boards.findOne({
      where: { title },
      raw: true,
    });

    if (!_.isEmpty(existingBoard)) {
      throw new APIError({
        code: httpStatus.BAD_REQUEST,
        message: "Duplicate Board, Please choose different 'title'.",
      });
    }

    const board = await Boards.create({ ...req.body, createdBy: req.user.id });
    return res.json({
      status: 200,
      message: "Board created successfully",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchBoardFromId = async (req, res, next) => {
  try {
    const board = await Boards.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });

    if (_.isEmpty(board)) {
      throw new APIError({
        code: httpStatus.BAD_REQUEST,
        message: "No Board Found, Please Check the Id",
      });
    }

    return res.json({
      status: 200,
      message: "Board fetched successfully",
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatBoard = async (req, res, next) => {
  try {
    if (_.isEmpty(req.body)) {
      throw new APIError({
        code: httpStatus.BAD_REQUEST,
        message: "Req body can not be empty",
      });
    }

    const { title, description } = req.body;
    let existingBoard;

    if (title) {
      existingBoard = await Boards.findOne({
        where: { title, createdBy: req.user.id },
      });
    }

    if (!_.isEmpty(existingBoard)) {
      throw new APIError({
        code: httpStatus.BAD_REQUEST,
        message: "Duplicate Board, Please choose different 'title'.",
      });
    }

    await Boards.update(
      {
        ...(title && { title }),
        ...(description && { description }),
      },
      {
        where: { id: req.params.id, createdBy: req.user.id },
      }
    );

    return res.json({
      status: 200,
      message: "Board Details Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deletBoard = async (req, res, next) => {
  try {
    await Boards.update(
      {
        archived: true,
      },
      {
        where: { id: req.params.id, createdBy: req.user.id },
      }
    );

    return res.json({
      status: 200,
      message: "Board Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

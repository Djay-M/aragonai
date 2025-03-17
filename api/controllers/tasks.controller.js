const _ = require("lodash");
const httpStatus = require("http-status");
const { Tasks, Boards } = require("../models");
const APIError = require("../utils/APIErrors");

exports.listAllTasks = async (req, res, next) => {
  try {
    const { boardId } = req.query;
    const tasks = await Tasks.findAll({
      where: { boardId, archived: false },
    });
    return res.json({
      status: 200,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

exports.creatTasks = async (req, res, next) => {
  try {
    const { boardId } = req.body;

    const existingBoard = await Boards.findOne({
      where: { id: boardId, createdBy: req.user.id },
      raw: true,
    });

    if (_.isEmpty(existingBoard)) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Invaild BoardId",
      });
    }

    const task = await Tasks.create({
      ...req.body,
      createdBy: req.user.id,
    });
    return res.json({
      status: 200,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchTaskFromId = async (req, res, next) => {
  try {
    const task = await Tasks.findOne({
      where: { id: req.params.id, createdBy: req.user.id },
    });

    if (_.isEmpty(task)) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "No Task Found, Please Check the Id",
      });
    }

    return res.json({
      status: 200,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatTask = async (req, res, next) => {
  try {
    if (_.isEmpty(req.body)) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Req body can not be empty",
      });
    }

    const { title, description, status } = req.body;

    const existingTask = await Tasks.findOne({
      id: req.params.id,
      createdBy: req.user.id,
    });

    if (_.isEmpty(existingTask)) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "No Task Found",
      });
    }

    await Tasks.update(
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.json({
      status: 200,
      message: "Task Details Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deletTask = async (req, res, next) => {
  try {
    await Tasks.update(
      {
        archived: true,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.json({
      status: 200,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

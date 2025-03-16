const { Joi } = require("celebrate");
const { taskStatus } = require("../config/vars");

module.exports = {
  // Get api/v1/tasks/getAllTasks?boardId
  getAllTasks: {
    query: {
      boardId: Joi.number().positive().required(),
    },
  },
  // POST api/v1/tasks/
  createTasks: {
    body: {
      boardId: Joi.number().positive().required(),
      title: Joi.string().required(),
      description: Joi.string().max(124).optional(),
      status: Joi.string()
        .valid(...taskStatus)
        .optional(),
    },
  },

  // POST api/v1/tasks/updateTasks/:id
  updateTasks: {
    body: {
      title: Joi.string().optional(),
      description: Joi.string().max(124).optional(),
      status: Joi.string()
        .valid(...taskStatus)
        .optional(),
    },
  },
};

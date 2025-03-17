const { Joi } = require("celebrate");

module.exports = {
  // POST api/v1/boards/
  createBoard: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().max(124).optional(),
    },
  },

  // POST api/v1/boards/updateBoard/:id
  updateBoard: {
    body: {
      title: Joi.string().optional(),
      description: Joi.string().max(124).optional(),
    },
  },
};

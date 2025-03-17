const { Joi } = require("celebrate");

module.exports = {
  // GET api/v1/tasks/getAllUsers
  getAllUsers: {
    query: Joi.object()
      .keys({
        sortBy: Joi.string().valid("id", "createdAt", "updatedAt").optional(),
        order: Joi.string().valid("ASC", "DESC").optional(),
        searchKey: Joi.string().valid("id", "firstName", "lastName").optional(),
        searchVal: Joi.string().optional(),
      })
      .optional(),
  },
  // POST api/v1/users/
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().optional(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },

  // POST api/v1/users/login
  loginUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },

  // POST api/v1/users/updateUser
  updateUser: {
    body: {
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      username: Joi.string().optional(),
    },
  },
};

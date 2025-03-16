const db = require("../models");

exports.init = () => {
  global.sequelize = db;
};

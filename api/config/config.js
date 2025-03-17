const { env } = require("./vars");

module.exports = {
  [env]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    host: process.env.DB_URL,
    dialect: "postgres",
    logging: false,
  },
};

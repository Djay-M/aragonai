"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        firstName: "demo",
        lastName: "user",
        username: "demo",
        password: "demo",
        archived: false,
        createdAt: "2025-03-16T07:31:23.190Z",
        updatedAt: "2025-03-16T07:31:23.190Z",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};

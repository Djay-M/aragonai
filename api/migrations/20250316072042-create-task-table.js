"use strict";
const { taskStatus } = require("../config/vars");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Boards",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: taskStatus[0],
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

    await queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        title: "Build UI for onboarding flow",
        description: "First tasks for board 'Platform Launch'",
        createdBy: 1,
        boardId: 1,
        status: "To Do",
        archived: false,
        createdAt: "2025-03-16T14:22:21.207Z",
        updatedAt: "2025-03-16T14:22:21.207Z",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};

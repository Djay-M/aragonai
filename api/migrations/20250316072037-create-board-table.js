"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Boards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.bulkInsert("Boards", [
      {
        id: 9999991,
        title: "Platform Launch",
        description: "First Board Calling It 'Platform Launch'",
        createdBy: 9999999,
        archived: false,
        createdAt: "2025-03-16T13:34:56.577Z",
        updatedAt: "2025-03-16T13:34:56.577Z",
      },
      {
        id: 9999992,
        title: "Marketing Plan",
        description: "Board of marketing tasks",
        createdBy: 9999999,
        archived: false,
        createdAt: "2025-03-16T13:34:56.577Z",
        updatedAt: "2025-03-16T13:34:56.577Z",
      },
      {
        id: 9999993,
        title: "Roadmap",
        description: "Board for tracking the status of tasks",
        createdBy: 9999999,
        archived: false,
        createdAt: "2025-03-16T13:34:56.577Z",
        updatedAt: "2025-03-16T13:34:56.577Z",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Boards");
  },
};

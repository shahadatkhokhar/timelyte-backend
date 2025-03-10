'use strict';
/** @type {import('sequelize-cli').Migration} */
const { tokenTypes } = require('../config/tokens');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      user: {
        type: Sequelize.BIGINT,
        required: true,
      },
      type: {
        type: Sequelize.ENUM([tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]),
        required: true,
      },
      expires: {
        type: Sequelize.DATE,
        required: true,
      },
      blacklisted: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  },
};

const Sequelize = require('sequelize');
const { tokenTypes } = require('../config/tokens');
const sequelize = require('../config/db');

const TokenModel = sequelize.define(
  'tokens',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.BIGINT.UNSIGNED,
      required: true,
    },
    type: {
      type: Sequelize.BIGINT.UNSIGNED,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
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
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

module.exports = TokenModel;

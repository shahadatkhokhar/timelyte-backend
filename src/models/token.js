'use strict';
const { DataTypes } = require('sequelize');
const { tokenTypes } = require('../config/tokens');
const sequelize = require('./index');

const Token = sequelize.define(
  'Token',
  {
    token: DataTypes.STRING,
    user: DataTypes.BIGINT,
    type: DataTypes.ENUM([tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]),
    expires: DataTypes.DATE,
    blacklisted: DataTypes.BOOLEAN,
  },
  {
    tableName: 'tokens',
  }
);

Token.associate = (models) => {
  // define association here
};
module.exports = Token;

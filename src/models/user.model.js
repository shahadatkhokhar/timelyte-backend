const Sequelize = require('sequelize');
const validator = require('validator');
const { roles } = require('../config/roles');
const sequelize = require('../config/db');

const UserModel = sequelize.define(
  'tokens',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: Sequelize.DataTypes.ENUM(roles),
      default: 'user',
    },
    isEmailVerified: {
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

module.exports = UserModel;

'use strict';
const { roles } = require('../config/roles');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    timeZone: {
      type: DataTypes.STRING,
      defaultValue: 'UTC',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: DataTypes.ENUM(roles),
      default: 'user',
    },
    about: {
      type: DataTypes.TEXT,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: 'users',
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate: (user, options) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  }
);

module.exports = User;
User.associate = (models) => {
  User.hasMany(models.AvailableSlot, { foreignKey: 'userId', as: 'availableSlots' });
  User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' });
  User.hasMany(models.SchedulingRule, { foreignKey: 'userId', as: 'schedulingRules' });
  User.hasMany(models.WorkingHours, { foreignKey: 'userId', as: 'workingHours' });
};

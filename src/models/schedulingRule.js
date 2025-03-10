const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const SchedulingRule = sequelize.define(
  'SchedulingRule',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Duration in minutes',
    },
    bufferBefore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Buffer time in minutes before meeting',
    },
    bufferAfter: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Buffer time in minutes after meeting',
    },
    daysInAdvance: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'scheduling_rules',
  }
);

SchedulingRule.associate = (models) => {
  SchedulingRule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = SchedulingRule;

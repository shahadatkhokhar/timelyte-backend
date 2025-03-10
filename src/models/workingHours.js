const { Model } = require('sequelize');
const sequelize = require('./index');

const WorkingHours = sequelize.define(
  'WorkingHours',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 6,
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'working_hours',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'dayOfWeek'],
      },
    ],
  }
);

WorkingHours.associate = (models) => {
  WorkingHours.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = WorkingHours;

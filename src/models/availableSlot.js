const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const AvailableSlot = sequelize.define(
  'AvailableSlot',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'available_slots',
    indexes: [
      {
        fields: ['userId', 'startTime', 'endTime'],
      },
    ],
  }
);

AvailableSlot.associate = (models) => {
  AvailableSlot.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  AvailableSlot.hasOne(models.Booking, { foreignKey: 'slotId', as: 'booking' });
};

module.exports = AvailableSlot;

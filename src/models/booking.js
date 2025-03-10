const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Booking = sequelize.define(
  'Booking',
  {
    id: {
      type: DataTypes.BIGINT,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    slotId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'available_slots',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    guestEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    guestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meetingLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('CONFIRMED', 'CANCELED', 'RESCHEDULED'),
      defaultValue: 'CONFIRMED',
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
    tableName: 'bookings',
  }
);

Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Booking.belongsTo(models.AvailableSlot, { foreignKey: 'slotId', as: 'slot' });
};

module.exports = Booking;

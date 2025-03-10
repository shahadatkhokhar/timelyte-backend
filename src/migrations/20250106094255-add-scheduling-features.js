// migrations/YYYYMMDDHHMMSS-add-scheduling-features.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add timeZone to users table
    await queryInterface.addColumn('users', 'timeZone', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'UTC',
    });

    // Create WorkingHours table
    await queryInterface.createTable('working_hours', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dayOfWeek: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create AvailableSlots table
    await queryInterface.createTable('available_slots', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isBooked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create SchedulingRules table
    await queryInterface.createTable('scheduling_rules', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes',
      },
      bufferBefore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bufferAfter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      daysInAdvance: {
        type: Sequelize.INTEGER,
        defaultValue: 30,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Create Bookings table
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      slotId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: 'available_slots',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      guestEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      guestName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meetingLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('CONFIRMED', 'CANCELED', 'RESCHEDULED'),
        defaultValue: 'CONFIRMED',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add necessary indexes
    await queryInterface.addIndex('working_hours', ['userId', 'dayOfWeek'], {
      unique: true,
      name: 'working_hours_user_day_unique',
    });

    await queryInterface.addIndex('available_slots', ['userId', 'startTime', 'endTime'], {
      name: 'available_slots_user_time_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('bookings');
    await queryInterface.dropTable('scheduling_rules');
    await queryInterface.dropTable('available_slots');
    await queryInterface.dropTable('working_hours');
    await queryInterface.removeColumn('users', 'timeZone');
  },
};

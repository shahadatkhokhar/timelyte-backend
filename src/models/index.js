// module.exports.Token = require('./token');
// module.exports.User = require('./user');
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize = new Sequelize(config.database, config.username, config.password, config);

const syncDb = async () => {
  try {
    // dont manipulate this statement below
    await sequelize.sync({ force: false, alter: { drop: false } });
  } catch (error) {
    throw error;
  }
};

syncDb();

sequelize
  .authenticate()
  .then((result) => {
    console.log('Connected To Database');
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = sequelize;

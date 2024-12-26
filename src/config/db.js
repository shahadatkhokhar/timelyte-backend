const { Sequelize } = require('sequelize');
const env = require('./config');
const logger = require('./logger');

const dbName = env.mysql.database;
const { dialect } = env.mysql;
const { username } = env.mysql;
const { password } = env.mysql;
const { host } = env.mysql;
const { pool } = env.mysql;
const { port } = env.mysql;

const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect,
  port,
  logging: false,
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
  define: {
    timestamps: false,
  },
});

const syncDbAndAuthenticate = async () => {
  await sequelize.sync({ force: false, alter: { drop: false } });
  logger.info('Database Synced');
};

syncDbAndAuthenticate();

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected To Database');
  })
  .catch((err) => {
    logger.error(err);
  });
module.exports = sequelize;

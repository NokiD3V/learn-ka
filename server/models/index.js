const dbConfig = require("../config/db.config.js");


/**
 * @description Создание базы данных и импортирование из конфигурации
 */
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
Sequelize.DataTypes

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Объявление в общей переменной db классов для разных таблиц
db.users = require('./users.model.js')(sequelize, Sequelize)

module.exports = db;
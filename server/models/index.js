const fs = require('fs')
const dbConfig = require('../config/db.config.js')

/**
 * @description Создание базы данных и импортирование из конфигурации
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true
  },
})
Sequelize.DataTypes

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Объявление в общей переменной db классов для разных таблиц

db.users = require('./users.model.js')(sequelize, Sequelize)
db.rules = require('./rules.model.js')(sequelize, Sequelize)
db.tasks = require('./tasks.model.js')(sequelize, Sequelize)
db.tokens = require('./tokens.model.js')(sequelize, Sequelize)
db.items = require('./items.model.js')(sequelize, Sequelize)

module.exports = db

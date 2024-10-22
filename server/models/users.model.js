const { Sequelize } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели пользователя в базе данных (автоматическая синхронизация при изменении)
   */

  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    class: {
      type: Sequelize.INTEGER,
      allowNull: true // Класс в учебной организации (подробнее в tasks.model.js)
    },
    currentTask: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    level:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    xp:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    coins:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },

    activeMainItem:{
      type: Sequelize.INTEGER,
      references: {
        model:'items',
        key: 'id'
      }
    },

    tasksHistory:{
      type: Sequelize.TEXT,
      defaultValue:"[0,0,0,0,0]"
    },
    lastWorkDate:{
      type: Sequelize.DATE,
      allowNull: true
    },

    successTasks:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    failedTasks:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  })

  return Users
}

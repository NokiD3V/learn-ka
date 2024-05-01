const { Sequelize } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели пользователя в базе данных (автоматическая синхронизация при изменении)
   */

  const Items = sequelize.define('items', {
    user: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    description:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    type:{
      type: Sequelize.STRING,
      allowNull: false // Тип предмета инвентаря. main, addon, magic
    },
    attack:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    defense:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hpboost:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0 // Если ХП заканчиваются, игра начинается заново (текущая словарная игра, а не весь геймплейный сюжет)
    }
  })

  return Items
}

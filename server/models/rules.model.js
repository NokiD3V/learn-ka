const { Sequelize } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели правил русского языка в базе данных (автоматическая синхронизация при изменении)
   */

  const Rules = sequelize.define('rules', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imgUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  return Rules
}

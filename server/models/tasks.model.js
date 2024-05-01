const { Sequelize } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели задания для пользователя в базе данных (автоматическая синхронизация при изменении)
   */

  const Tasks = sequelize.define('tasks', {
    type: {
      type: Sequelize.STRING,
      allowNull: false // answer, chose
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rule: {
      type: Sequelize.INTEGER,
      references: {
        model: 'rules',
        key: 'id'
      }
    },
    class: {
      type: Sequelize.INTEGER,
      allowNull: false
      // Класс (1-13) пользователя (предназначен сервис для школ и СПО)
      // 12 класс - СПО (Среднее профессиональное образование) или НЕ ОБУЧАЮЩИЙСЯ
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    args:{
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  return Tasks
}

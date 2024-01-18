const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели задания для пользователя в базе данных (автоматическая синхронизация при изменении)
   */
  
  
  const Tasks = sequelize.define("tasks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING, 
        allowNull: false // ХЗ ПОКА ПОТОМ ПРИДУМАЮ
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rule: {
        type: Sequelize.INTEGER,
        allowNull: true // Правило (ID), на которое ссылается задание, может и не быть 
      },
      class: {
        type: Sequelize.INTEGER,
        allowNull: false
        // Класс (1-13) пользователя (предназначен сервис для школ и СПО)
        // 12 класс - СПО (Среднее профессиональное образование) или НЕ ОБУЧАЮЩИЙСЯ
      }
    });
  
    return Tasks;
  };
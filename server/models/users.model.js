const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
   * @description Файл для настройки конфигурации модели пользователя в базе данных (автоматическая синхронизация при изменении)
   */
  
  
  const Users = sequelize.define("users", {
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
      balance:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      admin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return Users;
  };
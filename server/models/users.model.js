const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  /**
   * @param {Sequelize} Sequelize
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
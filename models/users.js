"use strict";

module.exports = (sequelize, Sequelize) => {
  var users = sequelize.define("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
      maxStringLength: 200,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      maxStringLength: 200,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      maxStringLength: 200,
    },
  });

  return users;
};

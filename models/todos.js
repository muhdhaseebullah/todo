"use strict";

module.exports = (sequelize, Sequelize) => {
  var todos = sequelize.define("todos", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      maxStringLength: 200,
    },
  });

  return todos;
};

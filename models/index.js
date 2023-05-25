'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require('../config/db-config');
const db = {};

let sequelize = new Sequelize({
    host: dbConfig.host,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    dialect: 'mysql',
    logging: false
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(e => {
        console.error('Unable to connect to the database:', e);
    });

module.exports = db;

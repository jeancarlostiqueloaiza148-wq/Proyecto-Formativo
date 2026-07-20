const {Sequelize} = require('sequelize');

const db = new Sequelize(
    database = "proyecto oviadso",
    username = "root",
    password ="jeancarlos2006",
    {
    dialect: "mysql",
    host: "localhost",
    port: 3306
    }
);

module.exports = db;
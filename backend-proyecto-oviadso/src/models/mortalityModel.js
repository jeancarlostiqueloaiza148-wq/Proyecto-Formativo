const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Mortality = db.define("mortalities", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ovine_id: {
        type: DataTypes.INTEGER,
        max: 30,
        min: 0,
        allowNull: false
    },
    cause: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    postJob: {
        type: DataTypes.STRING,
        max: 70,
        min: 3,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        max: 100,
        min: 0,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Mortality;
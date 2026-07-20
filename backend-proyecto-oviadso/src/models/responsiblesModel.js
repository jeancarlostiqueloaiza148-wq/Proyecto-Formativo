const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Responsible = db.define("responsibles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    document: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false,
        unique: true
    },
    postJob: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    phone: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: true
    },
    
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    
});

module.exports = Responsible;
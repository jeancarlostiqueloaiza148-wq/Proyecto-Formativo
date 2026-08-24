const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Birth = db.define("births", {
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
        max: 10,
        min: 3,
        allowNull: false
    },
    mother_id: {
        type: DataTypes.INTEGER,
        max: 10,
        min: 3,
        allowNull: false
    },
    
    status: {
        type: DataTypes.STRING,
        max: 40,
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
    notes: {
        type: DataTypes.STRING,
        max: 100,
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

module.exports = Birth;
const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Feeding = db.define("feedings", {
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
        min: 0,
        allowNull: false
    },
    food_type: {
        type: DataTypes.STRING,
        max: 20,
        min: 3,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL,
        max: 10,
        min: 0,
        allowNull: false
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
    notes: {
        type: DataTypes.STRING,
        max: 80,
        min: 4,
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

module.exports = Feeding;
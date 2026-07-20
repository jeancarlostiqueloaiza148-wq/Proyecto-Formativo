const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Weight = db.define("weights", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_ovine: {
        type: DataTypes.INTEGER,
        max: 10,
        min: 0,
        allowNull: false
    },
   weight: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
        min: 0
    }
},
    notes: {
        type: DataTypes.STRING,
        max: 50,
        min: 0,
        allowNull: true
    },
    active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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

module.exports = Weight;
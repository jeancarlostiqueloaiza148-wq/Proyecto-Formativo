const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Ovine = db.define("ovines", {
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
    tag: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false,
        unique: true
    },
    breed: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
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
}, {
    tableName: "ovines",
    freezeTableName: true,
});


module.exports = Ovine;  
const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Mounting = db.define("mountings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_of_mounting: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    result_mounting: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    breeding_male: {
        type: DataTypes.STRING,
        max: 50,
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
    }
}, {
    tableName: "mountings",
    freezeTableName: true
});

module.exports = Mounting;       
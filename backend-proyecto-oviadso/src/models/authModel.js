const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");


const auth = db.define("auth", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        max: 255,
        min: 3,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        max: 255,
        min: 3,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    postJob: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    activete: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    }
});


module.exports = auth;
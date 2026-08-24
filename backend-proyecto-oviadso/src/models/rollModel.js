const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Roll = db.define(
    "roll",
    {
        is_admin: {
            type: DataTypes.VARCHAR(45),
            allowNull: true,
        },

        is_instructor: {
            type: DataTypes.VARCHAR(45),
            allowNull: true,
        },

        is_aprendiz: {
            type: DataTypes.VARCHAR(45),
            allowNull: true,
        },

        name: {
            type: DataTypes.VARCHAR(45),
            allowNull: false,
        },

        abreviacion: {
            type: DataTypes.VARCHAR(45),
            allowNull: true,
        },

        fec_creacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        fec_actual: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        id_roll_route: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        tableName: "roll",
        timestamps: false,
    }
);

module.exports = Roll;
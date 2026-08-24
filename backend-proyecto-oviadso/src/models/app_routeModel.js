const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const AppRoute = db.define(
    "app_route",
    {
        id_app_route: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        path: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },

        icon: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },

        group: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },

        module: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
    },
    {
        tableName: "app_route",
        timestamps: false,
    }
);

module.exports = AppRoute;
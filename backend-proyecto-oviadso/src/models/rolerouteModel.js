const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const RoleRoute = db.define(
    "role_route",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        id_app_route: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "role_routes",
        timestamps: false,
    }
);

module.exports = RoleRoute;
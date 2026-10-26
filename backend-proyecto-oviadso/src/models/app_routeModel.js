// const { DataTypes } = require("sequelize");
// const db = require("../config/conectionDB");

// const AppRoute = db.define(
//     "app_route",
//     {
//         id_app_route: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         path: {
//             type: DataTypes.STRING(70),
//             allowNull: false,
//         },

//         name: {
//             type: DataTypes.STRING(70),
//             allowNull: false,
//         },

//         icon: {
//             type: DataTypes.STRING(70),
//             allowNull: true,
//         },

//         group: {
//             type: DataTypes.STRING(70),
//             allowNull: true,
//         },

//         module: {
//             type: DataTypes.STRING(70),
//             allowNull: true,
//         },
//     },
//     {
//         tableName: "app_route",
//         timestamps: false,
//     }
// );

// module.exports = AppRoute;


const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const AppRoutes = db.define("app_route", {
  id_app_route: {
    type: DataTypes.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  name_route: {
    type: DataTypes.STRING,
    max: 45,
  },
  route: {
    type: DataTypes.STRING,
    max: 255,
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  icono: {
    type: DataTypes.STRING,
    max: 45,
  },
});

module.exports = AppRoutes;
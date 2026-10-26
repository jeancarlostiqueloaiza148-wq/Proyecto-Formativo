const {DataTypes} = require("sequelize");
const db = require("../config/conectionDB");

const AppRouteRoll = db.define("AppRouteRoll", {
  id_app_routes_roll: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
   
  },
  id_app_routes: {
    type: DataTypes.INTEGER,
  },
  id_roll: {
    type: DataTypes.INTEGER,
  },
});

module.exports = AppRouteRoll;
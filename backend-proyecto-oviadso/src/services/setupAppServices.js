const roll = require("../models/rollModel");
const appRoutes = require("../models/appRouteModel");
const appRoutesRoll = require("../models/appRouteRollModel");
const {DEFAULT_ROLL, DEFAULT_APP_ROUTES, DEFAULT_ROLL_APP_ROUTES} = require("../config/DB-setup");


const createRoll = async () => {
    try {
      for(const rollData of DEFAULT_ROLL) {
        await roll.create(rollData);
      }
} catch (error) {
  throw error;
 }
};

const createRoutes = async () => {
    try {
        for(const routeData of DEFAULT_APP_ROUTES) {
            await appRoutes.create(routeData);
        }
    } catch (error) {
        throw error;
    }

};
const createRoutesRoll = async () => {
    try {
        for(const routeRollData of DEFAULT_ROLL_APP_ROUTES) {
            await appRoutesRoll.create(routeRollData);
        }
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createRoll,
    createRoutes,
    createRoutesRoll
};
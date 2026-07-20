const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Delivery = db.define("deliveries", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    mother_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    number_of_offspring: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
       
    },

    type_of_birth: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },

    complications: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: true
    },

    postJob: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    notes: {
        type: DataTypes.STRING,
        max: 50,
        min: 3, 
        allowNull: true
    },
   status: {
        type: DataTypes.STRING,
        max: 60,
        min: 3,
        allowNull: false,
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

module.exports = Delivery;
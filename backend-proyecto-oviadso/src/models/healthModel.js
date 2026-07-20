const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const Health = db.define("healths", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ovine_id: {
        type: DataTypes.INTEGER,
        max: 15,
        min: 0,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.STRING,
        max: 30,
        min: 3,
        allowNull: false
    },
    treatment: {
        type: DataTypes.STRING,
        max: 30,
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
    observations: {
        type: DataTypes.STRING,
        max: 80,
        min: 0,
        allowNull: true
    },
   vaccine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "vaccines",
        key: "id"
    },
},
vaccine_name: {
    type: DataTypes.STRING,
    max: 20,
    min: 4,
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

module.exports = Health;
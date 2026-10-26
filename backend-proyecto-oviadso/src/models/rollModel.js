// const { DataTypes } = require("sequelize");
// const db = require("../config/conectionDB");

// const Rol = db.define(
//     "rol",
//     {
//         is_admin: {
//             type: DataTypes.VARCHAR(45),
//             allowNull: true,
//         },

//         is_instructor: {
//             type: DataTypes.VARCHAR(45),
//             allowNull: true,
//         },

//         is_aprendiz: {
//             type: DataTypes.VARCHAR(45),
//             allowNull: true,
//         },

//         name: {
//             type: DataTypes.VARCHAR(45),
//             allowNull: false,
//         },

//         abreviacion: {
//             type: DataTypes.VARCHAR(45),
//             allowNull: true,
//         },

//         fec_creacion: {
//             type: DataTypes.DATE,
//             allowNull: true,
//         },

//         fec_actual: {
//             type: DataTypes.DATE,
//             allowNull: true,
//         },

//         id_rol_route: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//     },
//     {
//         tableName: "rol",
//         timestamps: false,
//     }
// );

// module.exports = Rol;



const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const roll = db.define("roll", {
  id_roll: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,  
    autoIncrement: true, 
  },
  slug: {
    type: DataTypes.STRING,
    max: 45,
  },
  name_roll: {
    type: DataTypes.STRING,
    max: 45,
  },
});

module.exports = roll;
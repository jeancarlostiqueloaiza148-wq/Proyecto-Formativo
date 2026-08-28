const { DataTypes } = require("sequelize"); 
 
const db = require("../config/conectionDB"); 
 
const User = db.define("users", { 
 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    }, 

    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
 
    username: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
    }, 
 
    email: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        unique: true, 
    }, 
 
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, 
 
    id_rol: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
    }, 
 
    postJob: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
    }, 
 
    verifyEmail: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false, 
    }, 
 
    active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true, 
    }, 
 
    status: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false, 
    }, 
 
    documentId: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
    }, 
 
    resetPasswordToken: { 
        type: DataTypes.STRING, 
        allowNull: true, 
    }, 
 
    resetPasswordExpires: { 
        type: DataTypes.DATE, 
        allowNull: true, 
    }, 
 
    createdAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW, 
    }, 
 
    updatedAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW, 
    }, 
 
}); 
 
module.exports = User;
const userModel = require("../models/userModel");

// Obtener todos los usuarios
const AllUsers = async () => {
    try {
        const users = await userModel.findAll();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener usuario por ID
const getUserById = async (id) => {
    try {
        const user = await userModel.findOne({ where: { id } });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear usuario
const createUserService = async (data) => {
    try {
        const newUser = await userModel.create(data);
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar usuario
const updateUser = async (id, data) => {
    try {
        const updatedUser = await userModel.update(data, {
            where: { id }
        });
        return updatedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar usuario
const deleteUser = async (id) => {
    try {
        return await userModel.update(
            { active: 0 },
            {
                where: { id }
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    AllUsers,
    getUserById,
    createUserService,
    updateUser,
    deleteUser,
};
const bcrypt = require("bcrypt");
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
        const user = await userModel.findOne({
            where: { id }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



// Buscar usuario por correo electrónico
const getUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({
            where: { email }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



// Buscar usuario por username
const getUserByUsername = async (username) => {
    try {
        const user = await userModel.findOne({
            where: { username }
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



// Crear usuario
const createUserService = async (data) => {
    try {

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await userModel.create({
            ...data,
            password: hashedPassword
        });

        return newUser;

    } catch (error) {
        console.log(error);
        throw error;
    }
};



// Actualizar usuario
const updateUser = async (id, data) => {
    try {

        // Si se está actualizando la contraseña,
        // también debemos cifrarla
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await userModel.update(
            data,
            {
                where: { id }
            }
        );

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



// Guardar token de recuperación
const saveResetPasswordToken = async (id, token, expires) => {
    try {

        const updatedUser = await userModel.update(
            {
                resetPasswordToken: token,
                resetPasswordExpires: expires
            },
            {
                where: { id }
            }
        );

        return updatedUser;

    } catch (error) {
        console.log(error);
        throw error;
    }
};



// Buscar usuario por token de recuperación
const getUserByResetToken = async (token) => {
    try {

        const user = await userModel.findOne({
            where: {
                resetPasswordToken: token
            }
        });

        return user;

    } catch (error) {
        console.log(error);
        throw error;
    }
};



module.exports = {
    AllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUserService,
    updateUser,
    deleteUser,
    saveResetPasswordToken,
    getUserByResetToken
};
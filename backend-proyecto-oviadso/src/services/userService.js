const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


//Obtener todos los ususarios
const AllUsers = async (limit, offset) => {
  try {

    const users = await userModel.findAll({
      limit: limit,
      offset: offset
    });

    return users;

  } catch (error) {

    console.log(error);
    throw error;

  }
};


// Contar todos los usuarios
const countUsers = async () => {
  try {
    const total = await userModel.count();

    return total;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//Obtener ususario por id
const getUserById = async (id) => {
  try {

    const user = await userModel.findOne({
      where: {
        id: id
      }
    });

    return user;

  } catch (error) {

    console.log(error);
    throw error;

  }
};



//Buscar usuario por email
const getUserByEmail = async (email) => {
  try {

    const user = await userModel.findOne({
      where: {
        email: email
      }
    });

    return user;

  } catch (error) {

    console.log(error);
    throw error;

  }
};


//Get email users
const getEmailUser = async (email) => {
  try {

    const user = await userModel.findOne({
      where: {
        email: email
      }
    });

    return user;

  } catch (error) {

    console.log(error);
    throw error;

  }
};



//Buscar usuario por username
const getUserByUsername = async (username) => {
  try {

    const user = await userModel.findOne({
      where: {
        username: username
      }
    });

    return user;

  } catch (error) {

    console.log(error);
    throw error;

  }
};



//Crear usuario
const createUserService = async (data) => {
  try {

    //Generar salt
    const salt = await bcrypt.genSalt(10);

    //Cifrar contraseña
    const hashedPassword = await bcrypt.hash(
      data.password,
      salt
    );

    // Crear usuario
    const newUser = await userModel.create({

      username: data.username,

      email: data.email,

      password: hashedPassword,

      id_rol: data.id_rol,

      postJob: data.postJob,

      verifyEmail: data.verifyEmail,

      active: data.active,

      status: data.status,

      salt: salt,

      documentId: data.documentId,

      solicitud_password: false

    });

    return newUser;

  } catch (error) {

    console.log("Error en createUserService:", error);
    throw error;

  }
};



//Actualizar usuario
const updateUser = async (id, data) => {
  try {

    //Si se actualiza la contraseña
    if (data.password) {

      //Generar nuevo salt
      const salt = await bcrypt.genSalt(10);

      //Cifrar nueva contraseña
      const hashedPassword = await bcrypt.hash(
        data.password,
        salt
      );

      data.password = hashedPassword;

      data.salt = salt;
    }

    const updatedUser = await userModel.update(
      data,
      {
        where: {
          id: id
        }
      }
    );

    return updatedUser;

  } catch (error) {

    console.log(error);
    throw error;

  }
};



//Inactivar usuario
const deleteUser = async (id) => {
  try {

    return await userModel.update(
      {
        active: 0
      },
      {
        where: {
          id: id
        }
      }
    );

  } catch (error) {

    console.log(error);
    throw error;

  }
};



//Guardar token de recuperacion de contraseña
const saveResetPasswordToken = async (
  id,
  token,
  expires
) => {

  try {

    const updatedUser = await userModel.update(
      {
        resetPasswordToken: token,

        resetPasswordExpires: expires,

        solicitud_password: true
      },
      {
        where: {
          id: id
        }
      }
    );

    return updatedUser;

  } catch (error) {

    console.log(error);
    throw error;

  }
};


//Buscar usuario por token de recuperacion de contraseña
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
  getEmailUser,
  countUsers,
  getUserByUsername,
  createUserService,
  updateUser,
  deleteUser,
  saveResetPasswordToken,
  getUserByResetToken

};
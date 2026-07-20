const auth = require("../models/authModel");



// Obtener todos los usuarios
const getAllAuths = async () => {
  try {
    const auths = await auth.findAll();
    return auths;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Obtener usuario por id
const getAuthById = async (id) => {
  try {
    const authid = await auth.findOne({ where: { id } });
    return authid;
  } catch (error) {
    console.log(error);
  }
};



// Crear usuario
const createAuth = async (data) => {
  try {
    const newAuth = await auth.create(data);
    return newAuth;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Actualizar usuario
const updateAuth = async (id, data) => {
  try {
    const updateAuth = await auth.update(data, { where: { id } });
    return updateAuth;
  } catch (error) {
    console.log(error);
  }
};


// Inactivar usuario
const deleteAuth = async (id) => {
  try {
    const deleteAuth = await auth.destroy({ where: { id } });
    return deleteAuth;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAuths,
  getAuthById,
  createAuth,
  updateAuth,
  deleteAuth,
};
const responsible = require("../models/responsiblesModel");

// Obtener todos los responsables
const getAllResponsibles = async (limit, offset) => {
  try {
    const responsibles = await responsible.findAll({limit:limit,offset:offset});
    return responsibles;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Contar todos los responsables
const countResponsibles = async () => {
  try {
    const total = await responsible.count();
    return total;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Obtener responsable por id
const getResponsibleById = async (id) => {
  try {
    const responsibleId = await responsible.findOne({ where: { id } });
    return responsibleId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Crear responsable
const createResponsibleService = async (data) => {
  try {
    const newResponsible = await responsible.create(data);
    return newResponsible;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Actualizar responsable
const updateResponsible = async (id, data) => {
  try {
    const updatedResponsible = await responsible.update(data, {
      where: { id }
    });
    return updatedResponsible;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Inactivar responsable
const deleteResponsible = async (id) => {
  try {
    return await responsible.update(
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
  getAllResponsibles,
  getResponsibleById,
  countResponsibles,
  createResponsibleService,
  updateResponsible,
  deleteResponsible,
};
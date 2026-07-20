const ovine = require("../models/ovineModel");

// Obtener todos los ovinos
const getAllOvines = async () => {
    try {
        const ovines = await ovine.findAll();
        return ovines;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener ovino por ID
const getOvineById = async (id) => {
    try {
        const ovineid = await ovine.findOne({ where: { id } });
        return ovineid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear ovino
const createOvineService = async (data) => {
    try {
        const newOvine = await ovine.create(data);
        return newOvine;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar ovino
const updateOvine = async (id, data) => {
    try {
        const updatedOvine = await ovine.update(data, { where: { id } });
        return updatedOvine;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar ovino
const deleteOvine = async (id) => {
    try {
        return await ovine.update(
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
    getAllOvines,
    getOvineById,
    createOvineService,
    updateOvine,
    deleteOvine,
};
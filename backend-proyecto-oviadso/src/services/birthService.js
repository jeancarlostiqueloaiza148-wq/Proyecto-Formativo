const birth = require("../models/birthModel");

// Obtener todos los nacimientos
const getAllBirths = async () => {
    try {
        const births = await birth.findAll();
        return births;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener nacimiento por id
const getBirthById = async (id) => {
    try {
        const birthid = await birth.findOne({ where: { id } });
        return birthid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear nacimiento
const createBirthService = async (data) => {
    try {
        const newBirth = await birth.create(data);
        return newBirth;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar nacimiento
const updateBirth = async (id, data) => {
    try {
        const updatedBirth = await birth.update(data, {
            where: { id }
        });
        return updatedBirth;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar nacimiento
const deleteBirth = async (id) => {
    try {
        return await birth.update(
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
    getAllBirths,
    getBirthById,
    createBirthService,
    updateBirth,
    deleteBirth,
};
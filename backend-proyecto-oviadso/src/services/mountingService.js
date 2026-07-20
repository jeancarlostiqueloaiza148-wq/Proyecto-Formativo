const mounting = require("../models/mountingModel");

// Obtener todas las montas
const getAllMountings = async () => {
    try {
        const mountings = await mounting.findAll();
        return mountings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener monta por ID
const getMountingById = async (id) => {
    try {
        const mountingid = await mounting.findOne({ where: { id } });
        return mountingid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear monta
const createMountingService = async (data) => {
    try {
        const newMounting = await mounting.create(data);
        return newMounting;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar monta
const updateMounting = async (id, data) => {
    try {
        const updatedMounting = await mounting.update(data, { where: { id } });
        return updatedMounting;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar monta
const deleteMounting = async (id) => {
    try {
        return await mounting.update(
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
    getAllMountings,
    getMountingById,
    createMountingService,
    updateMounting,
    deleteMounting,
};
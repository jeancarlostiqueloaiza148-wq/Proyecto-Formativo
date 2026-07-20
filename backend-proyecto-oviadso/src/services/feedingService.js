const feeding = require("../models/feedingModel");

// Obtener todas las alimentaciones
const getAllFeedings = async () => {
    try {
        const feedings = await feeding.findAll();
        return feedings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener alimentación por id
const getFeedingById = async (id) => {
    try {
        const feedingid = await feeding.findOne({ where: { id } });
        return feedingid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear alimentación
const createFeedingService = async (data) => {
    try {
        const newFeeding = await feeding.create(data);
        return newFeeding;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar alimentación
const updateFeeding = async (id, data) => {
    try {
        const updatedFeeding = await feeding.update(data, {
            where: { id }
        });
        return updatedFeeding;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar alimentación
const deleteFeeding = async (id) => {
    try {
        return await feeding.update(
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
    getAllFeedings,
    getFeedingById,
    createFeedingService,
    updateFeeding,
    deleteFeeding,
};
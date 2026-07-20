const weight = require("../models/weightModel");

// Obtener todos los pesos
const getAllWeights = async () => {
    try {
        const weights = await weight.findAll();
        return weights;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener peso por ID
const getWeightById = async (id) => {
    try {
        const weightId = await weight.findOne({
            where: { id }
        });
        return weightId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear peso
const createWeightService = async (data) => {
    try {
        const newWeight = await weight.create(data);
        return newWeight;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar peso
const updateWeight = async (id, data) => {
    try {
        const updatedWeight = await weight.update(data, {
            where: { id }
        });
        return updatedWeight;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar peso
const deleteWeight = async (id) => {
    try {
        return await weight.update(
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
    getAllWeights,
    getWeightById,
    createWeightService,
    updateWeight,
    deleteWeight,
};
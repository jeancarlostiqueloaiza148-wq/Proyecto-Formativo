const health = require("../models/healthModel");

// Obtener todos los registros de salud
const getAllHealths = async (limit, offset) => {
    try {
        const healths = await health.findAll({limit:limit,offset:offset});
        return healths;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener registro de salud por id
const getHealthById = async (id) => {
    try {
        const healthid = await health.findOne({ where: { id } });
        return healthid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear registro de salud
const createHealthService = async (data) => {
    try {
        const newHealth = await health.create(data);
        return newHealth;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar registro de salud
const updateHealth = async (id, data) => {
    try {
        const updatedHealth = await health.update(data, {
            where: { id }
        });
        return updatedHealth;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar registro de salud
const deleteHealth = async (id) => {
    try {
        return await health.update(
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
    getAllHealths,
    getHealthById,
    createHealthService,
    updateHealth,
    deleteHealth,
};
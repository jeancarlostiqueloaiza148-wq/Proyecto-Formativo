const mortality = require("../models/mortalityModel");

// Obtener todas las mortalidades
const getAllMortalities = async () => {
    try {
        const mortalities = await mortality.findAll();
        return mortalities;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener mortalidad por ID
const getMortalityById = async (id) => {
    try {
        const mortalityId = await mortality.findOne({
            where: { id }
        });
        return mortalityId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Crear mortalidad
const createMortalityService = async (data) => {
    try {
        const newMortality = await mortality.create(data);
        return newMortality;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar mortalidad
const updateMortality = async (id, data) => {
    try {
        const updatedMortality = await mortality.update(
            data,
            {
                where: { id }
            }
        );

        return updatedMortality;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Inactivar mortalidad
const deleteMortality = async (id) => {
    try {
        return await mortality.update(
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
    getAllMortalities,
    getMortalityById,
    createMortalityService,
    updateMortality,
    deleteMortality
};
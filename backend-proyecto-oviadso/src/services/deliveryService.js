const delivery = require("../models/deliveryModel");



// Obtener todos los partos
const getAllDeliveries = async () => {
  try {
    const deliveries = await delivery.findAll();
    return deliveries;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Obtener parto por id
const getDeliveryById = async (id) => {
  try {
    const deliveryid = await delivery.findOne({ where: { id } });
    return deliveryid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Crear parto
const createDeliveryService = async (data) => {
  try {
    const newDelivery = await delivery.create(data);
    return newDelivery;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Actualizar parto
const updateDelivery = async (id, data) => {
  try {
    const updateDelivery = await delivery.update(data, { where: { id } });
    return updateDelivery;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Inactivar parto
const deleteDelivery = async (id) => {

    try {
        return await delivery.update(
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
  getAllDeliveries,
  getDeliveryById,
  createDeliveryService,
  updateDelivery,
  deleteDelivery,
};
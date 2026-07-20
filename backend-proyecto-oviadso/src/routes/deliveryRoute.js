const express = require('express');
const router = express.Router();

const {
    getAllDeliveries,
    getDeliveryById,
    createDelivery, 
    updateDelivery,
    deleteDelivery
} = require("../controllers/deliveryController.js");

// Obtener todos los deliveries
router.get("/deliveries", getAllDeliveries);

// Obtener delivery por ID
router.get("/deliveries/:id", getDeliveryById);

// Crear delivery
router.post("/deliveries", createDelivery);

// Actualizar delivery
router.put("/deliveries/:id", updateDelivery);

// Inactivar delivery
router.delete("/deliveries/:id", deleteDelivery);

module.exports = router;
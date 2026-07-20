const express = require('express');
const router = express.Router();

const {
    getAllHealths,
    getHealthById,
    createHealth,
    updateHealth,
    deleteHealth
} = require("../controllers/healthController.js");

// Obtener todos los registros de salud
router.get("/healths", getAllHealths);

// Obtener registro de salud por ID
router.get("/healths/:id", getHealthById);

// Crear registro de salud
router.post("/healths", createHealth);

// Actualizar registro de salud
router.put("/healths/:id", updateHealth);

// Eliminar registro de salud
router.delete("/healths/:id", deleteHealth);

module.exports = router;
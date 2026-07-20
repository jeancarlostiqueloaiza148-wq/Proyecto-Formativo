const express = require('express');
const router = express.Router();

const {
    getAllWeights,
    getWeightById,
    createWeight,
    updateWeight,
    deleteWeight
} = require("../controllers/weightController.js");

// Obtener todos los pesos
router.get("/weights", getAllWeights);

// Obtener peso por ID
router.get("/weights/:id", getWeightById);

// Crear peso
router.post("/weights", createWeight);

// Actualizar peso
router.put("/weights/:id", updateWeight);

// Eliminar peso
router.delete("/weights/:id", deleteWeight);

module.exports = router;
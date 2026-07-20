const express = require('express');
const router = express.Router();

const {
    getAllBirths,
    getBirthById,
    createBirth,
    updateBirth,
    deleteBirth
} = require("../controllers/birthsController.js");

// Obtener todos los nacimientos
router.get("/births", getAllBirths);

// Obtener nacimiento por ID
router.get("/births/:id", getBirthById);

// Crear nacimiento
router.post("/births", createBirth);

// Actualizar nacimiento
router.put("/births/:id", updateBirth);

// Eliminar nacimiento
router.delete("/births/:id", deleteBirth);

module.exports = router;
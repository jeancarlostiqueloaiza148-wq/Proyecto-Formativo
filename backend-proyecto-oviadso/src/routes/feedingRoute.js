const express = require('express');
const router = express.Router();

const {
    getAllFeedings,
    getFeedingById,
    createFeeding,
    updateFeeding,
    deleteFeeding
} = require("../controllers/feedingController.js");

// Obtener todas las alimentaciones
router.get("/feedings", getAllFeedings);

// Obtener alimentación por ID
router.get("/feedings/:id", getFeedingById);

// Crear alimentación
router.post("/feedings", createFeeding);

// Actualizar alimentación
router.put("/feedings/:id", updateFeeding);

// Eliminar alimentación
router.delete("/feedings/:id", deleteFeeding);

module.exports = router;
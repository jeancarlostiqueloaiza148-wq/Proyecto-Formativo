const express = require('express');
const router = express.Router();

const {
    getAllMortalities,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
} = require("../controllers/mortalityController.js");

// Obtener todos los registros de mortalidad
router.get("/mortalities", getAllMortalities);

// Obtener registro de mortalidad por ID
router.get("/mortalities/:id", getMortalityById);

// Crear registro de mortalidad
router.post("/mortalities", createMortality);

// Actualizar registro de mortalidad
router.put("/mortalities/:id", updateMortality);

// Eliminar registro de mortalidad
router.delete("/mortalities/:id", deleteMortality);

module.exports = router;
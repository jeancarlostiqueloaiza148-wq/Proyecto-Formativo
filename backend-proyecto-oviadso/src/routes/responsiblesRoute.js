const express = require('express');
const router = express.Router();

const {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
} = require("../controllers/responsiblesController.js");

// Obtener todos
router.get("/responsibles", getAllResponsibles);

// Obtener por ID
router.get("/responsibles/:id", getResponsibleById);

// Crear
router.post("/responsibles", createResponsible);

// Actualizar
router.put("/responsibles/:id", updateResponsible);

// Eliminar
router.delete("/responsibles/:id", deleteResponsible);

module.exports = router;
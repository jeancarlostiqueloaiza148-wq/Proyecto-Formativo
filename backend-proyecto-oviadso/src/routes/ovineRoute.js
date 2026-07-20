const express = require('express');
const router = express.Router();

const {
    getAllOvines,
    getOvineById,
    createOvine,
    updateOvine,
    deleteOvine
} = require("../controllers/ovineController.js");

// Obtener todos los ovinos
router.get("/ovines", getAllOvines);

// Obtener ovinos por ID
router.get("/ovines/:id", getOvineById);

// Crear ovino
router.post("/ovines", createOvine);

// Actualizar ovino
router.put("/ovines/:id", updateOvine);

// Eliminar ovino
router.delete("/ovines/:id", deleteOvine);

module.exports = router;
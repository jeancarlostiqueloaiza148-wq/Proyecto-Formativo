const express = require('express');
const router = express.Router();

const {
    getAllMountings,
    getMountingById,
    createMounting,
    updateMounting,
    deleteMounting
} = require("../controllers/mountingController.js");

// Obtener todos los registros de monta
router.get("/mountings", getAllMountings);

// Obtener registro de monta por ID
router.get("/mountings/:id", getMountingById);

// Crear registro de monta
router.post("/mountings", createMounting);

// Actualizar registro de monta
router.put("/mountings/:id", updateMounting);

// Eliminar registro de monta
router.delete("/mountings/:id", deleteMounting);

module.exports = router;
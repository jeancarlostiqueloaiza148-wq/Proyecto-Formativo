const express = require('express');
const router = express.Router();

const {
    getAllFeedings,
    getFeedingById,
    createFeeding,
    updateFeeding,
    deleteFeeding
} = require("../controllers/feedingController.js");

/**
 * @swagger
 * /api/feeding/feedings:
 *   get:
 *     summary: Obtener todas las alimentaciones
 *     responses:
 *       200:
 *         description: Lista de alimentaciones
 */
router.get("/feedings", getAllFeedings);

/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   get:
 *     summary: Obtener alimentación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación encontrada
 */
router.get("/feedings/:id", getFeedingById);

/**
 * @swagger
 * /api/feeding/feedings:
 *   post:
 *     summary: Crear alimentación
 *     responses:
 *       201:
 *         description: Alimentación creada
 */
router.post("/feedings", createFeeding);

/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   put:
 *     summary: Actualizar alimentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación actualizada
 */
router.put("/feedings/:id", updateFeeding);

/**
 * @swagger
 * /api/feeding/feedings/{id}:
 *   delete:
 *     summary: Eliminar alimentación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación eliminada
 */
router.delete("/feedings/:id", deleteFeeding);

module.exports = router;
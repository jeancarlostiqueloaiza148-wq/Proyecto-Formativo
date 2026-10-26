const express = require('express');
const router = express.Router();
const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllWeights,
    getWeightById,
    createWeight,
    updateWeight,
    deleteWeight
} = require("../controllers/weightController.js");

/**
 * @swagger
 * /api/weight/weights:
 *   get:
 *     summary: Obtener todos los pesos
 *     responses:
 *       200:
 *         description: Lista de pesos
 */
router.get("/weights",  getAllWeights);

/**
 * @swagger
 * /api/weight/weights/{id}:
 *   get:
 *     summary: Obtener peso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Peso encontrado
 */
router.get("/weights/:id",  getWeightById);

/**
 * @swagger
 * /api/weight/weights:
 *   post:
 *     summary: Crear peso
 *     responses:
 *       201:
 *         description: Peso creado
 */
router.post("/weights",createWeight);

/**
 * @swagger
 * /api/weight/weights/{id}:
 *   put:
 *     summary: Actualizar peso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Peso actualizado
 */
router.put("/weights/:id", updateWeight);

/**
 * @swagger
 * /api/weight/weights/{id}:
 *   delete:
 *     summary: Eliminar peso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Peso eliminado
 */
router.delete("/weights/:id",  deleteWeight);

module.exports = router;
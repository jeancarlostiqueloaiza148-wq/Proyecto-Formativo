const express = require('express');
const router = express.Router();

const {
    getAllHealths,
    getHealthById,
    createHealth,
    updateHealth,
    deleteHealth
} = require("../controllers/healthController.js");

/**
 * @swagger
 * /api/health/healths:
 *   get:
 *     summary: Obtener todos los registros de salud
 *     responses:
 *       200:
 *         description: Lista de registros de salud
 */
router.get("/healths", getAllHealths);

/**
 * @swagger
 * /api/health/healths/{id}:
 *   get:
 *     summary: Obtener registro de salud por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud encontrado
 */
router.get("/healths/:id", getHealthById);

/**
 * @swagger
 * /api/health/healths:
 *   post:
 *     summary: Crear registro de salud
 *     responses:
 *       201:
 *         description: Registro de salud creado
 */
router.post("/healths", createHealth);

/**
 * @swagger
 * /api/health/healths/{id}:
 *   put:
 *     summary: Actualizar registro de salud
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud actualizado
 */
router.put("/healths/:id", updateHealth);

/**
 * @swagger
 * /api/health/healths/{id}:
 *   delete:
 *     summary: Eliminar registro de salud
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud eliminado
 */
router.delete("/healths/:id", deleteHealth);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getAllBirths,
    getBirthById,
    createBirth,
    updateBirth,
    deleteBirth
} = require("../controllers/birthsController.js");

/**
 * @swagger
 * /api/birth/births:
 *   get:
 *     summary: Obtener todos los nacimientos
 *     responses:
 *       200:
 *         description: Lista de nacimientos
 */
router.get("/births", getAllBirths);

/**
 * @swagger
 * /api/birth/births/{id}:
 *   get:
 *     summary: Obtener nacimiento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento encontrado
 */
router.get("/births/:id", getBirthById);

/**
 * @swagger
 * /api/birth/births:
 *   post:
 *     summary: Crear nacimiento
 *     responses:
 *       201:
 *         description: Nacimiento creado
 */
router.post("/births", createBirth);

/**
 * @swagger
 * /api/birth/births/{id}:
 *   put:
 *     summary: Actualizar nacimiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento actualizado
 */
router.put("/births/:id", updateBirth);

/**
 * @swagger
 * /api/birth/births/{id}:
 *   delete:
 *     summary: Eliminar nacimiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento eliminado
 */
router.delete("/births/:id", deleteBirth);

module.exports = router;
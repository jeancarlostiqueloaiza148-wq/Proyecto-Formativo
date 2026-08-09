const express = require('express');
const router = express.Router();

const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllMortalities,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
} = require("../controllers/mortalityController.js");

/**
 * @swagger
 * /api/mortality/mortalities:
 *   get:
 *     summary: Obtener todos los registros de mortalidad
 *     responses:
 *       200:
 *         description: Lista de registros de mortalidad
 */
router.get("/mortalities", ValidateToken, getAllMortalities);

/**
 * @swagger
 * /api/mortality/mortalities/{id}:
 *   get:
 *     summary: Obtener registro de mortalidad por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad encontrado
 */
router.get("/mortalities/:id", ValidateToken, getMortalityById);

/**
 * @swagger
 * /api/mortality/mortalities:
 *   post:
 *     summary: Crear registro de mortalidad
 *     responses:
 *       201:
 *         description: Registro de mortalidad creado
 */
router.post("/mortalities", ValidateToken, createMortality);

/**
 * @swagger
 * /api/mortality/mortalities/{id}:
 *   put:
 *     summary: Actualizar registro de mortalidad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad actualizado
 */
router.put("/mortalities/:id", ValidateToken, updateMortality);

/**
 * @swagger
 * /api/mortality/mortalities/{id}:
 *   delete:
 *     summary: Eliminar registro de mortalidad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad eliminado
 */
router.delete("/mortalities/:id", ValidateToken, deleteMortality);

module.exports = router;
const express = require('express');
const router = express.Router();

const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllMountings,
    getMountingById,
    createMounting,
    updateMounting,
    deleteMounting
} = require("../controllers/mountingController.js");

/**
 * @swagger
 * /api/mounting/mountings:
 *   get:
 *     summary: Obtener todos los registros de monta
 *     responses:
 *       200:
 *         description: Lista de registros de monta
 */
router.get("/mountings", ValidateToken, getAllMountings);

/**
 * @swagger
 * /api/mounting/mountings/{id}:
 *   get:
 *     summary: Obtener registro de monta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de monta encontrado
 */
router.get("/mountings/:id", ValidateToken, getMountingById);

/**
 * @swagger
 * /api/mounting/mountings:
 *   post:
 *     summary: Crear registro de monta
 *     responses:
 *       201:
 *         description: Registro de monta creado
 */
router.post("/mountings", ValidateToken, createMounting);

/**
 * @swagger
 * /api/mounting/mountings/{id}:
 *   put:
 *     summary: Actualizar registro de monta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de monta actualizado
 */
router.put("/mountings/:id", ValidateToken, updateMounting);

/**
 * @swagger
 * /api/mounting/mountings/{id}:
 *   delete:
 *     summary: Eliminar registro de monta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de monta eliminado
 */
router.delete("/mountings/:id", ValidateToken, deleteMounting);

module.exports = router;
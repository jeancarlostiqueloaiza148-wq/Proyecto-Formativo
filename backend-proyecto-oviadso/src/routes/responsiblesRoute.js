const express = require('express');
const router = express.Router();

const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
} = require("../controllers/responsiblesController.js");

/**
 * @swagger
 * /api/responsibles/responsibles:
 *   get:
 *     summary: Obtener todos los responsables
 *     responses:
 *       200:
 *         description: Lista de responsables
 */
router.get("/responsibles", ValidateToken, getAllResponsibles);

/**
 * @swagger
 * /api/responsibles/responsibles/{id}:
 *   get:
 *     summary: Obtener responsable por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable encontrado
 */
router.get("/responsibles/:id", ValidateToken, getResponsibleById);

/**
 * @swagger
 * /api/responsibles/responsibles:
 *   post:
 *     summary: Crear responsable
 *     responses:
 *       201:
 *         description: Responsable creado
 */
router.post("/responsibles", ValidateToken, createResponsible);

/**
 * @swagger
 * /api/responsibles/responsibles/{id}:
 *   put:
 *     summary: Actualizar responsable
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable actualizado
 */
router.put("/responsibles/:id", ValidateToken, updateResponsible);

/**
 * @swagger
 * /api/responsibles/responsibles/{id}:
 *   delete:
 *     summary: Eliminar responsable
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable eliminado
 */
router.delete("/responsibles/:id", ValidateToken, deleteResponsible);

module.exports = router;
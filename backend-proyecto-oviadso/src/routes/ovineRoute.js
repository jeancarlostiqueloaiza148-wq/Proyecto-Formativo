const express = require('express');
const router = express.Router();

const {
    getAllOvines,
    getOvineById,
    createOvine,
    updateOvine,
    deleteOvine
} = require("../controllers/ovineController.js");

/**
 * @swagger
 * /api/ovine/ovines:
 *   get:
 *     summary: Obtener todos los ovinos
 *     responses:
 *       200:
 *         description: Lista de ovinos
 */
router.get("/ovines", getAllOvines);

/**
 * @swagger
 * /api/ovine/ovines/{id}:
 *   get:
 *     summary: Obtener ovino por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ovino encontrado
 */
router.get("/ovines/:id", getOvineById);

/**
 * @swagger
 * /api/ovine/ovines:
 *   post:
 *     summary: Crear ovino
 *     responses:
 *       201:
 *         description: Ovino creado
 */
router.post("/ovines", createOvine);

/**
 * @swagger
 * /api/ovine/ovines/{id}:
 *   put:
 *     summary: Actualizar ovino
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ovino actualizado
 */
router.put("/ovines/:id", updateOvine);

/**
 * @swagger
 * /api/ovine/ovines/{id}:
 *   delete:
 *     summary: Eliminar ovino
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ovino eliminado
 */
router.delete("/ovines/:id", deleteOvine);

module.exports = router;
const express = require('express');
const router = express.Router();

const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
} = require("../controllers/deliveryController.js");

/**
 * @swagger
 * /api/delivery/deliveries:
 *   get:
 *     summary: Obtener todos los partos
 *     responses:
 *       200:
 *         description: Lista de partos
 */
router.get("/deliveries", ValidateToken, getAllDeliveries);

/**
 * @swagger
 * /api/delivery/deliveries/{id}:
 *   get:
 *     summary: Obtener parto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parto encontrado
 */
router.get("/deliveries/:id", ValidateToken, getDeliveryById);

/**
 * @swagger
 * /api/delivery/deliveries:
 *   post:
 *     summary: Crear parto
 *     responses:
 *       201:
 *         description: Parto creado
 */
router.post("/deliveries", ValidateToken, createDelivery);

/**
 * @swagger
 * /api/delivery/deliveries/{id}:
 *   put:
 *     summary: Actualizar parto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parto actualizado
 */
router.put("/deliveries/:id", ValidateToken, updateDelivery);

/**
 * @swagger
 * /api/delivery/deliveries/{id}:
 *   delete:
 *     summary: Inactivar parto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parto inactivado
 */
router.delete("/deliveries/:id", ValidateToken, deleteDelivery);

module.exports = router;
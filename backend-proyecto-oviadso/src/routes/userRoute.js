const express = require('express');
const router = express.Router();
const { ValidateToken } = require("../middlewares/handlerToken");

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController.js");

/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/users", ValidateToken, getAllUsers);

/**
 * @swagger
 * /api/user/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */

router.get("/users/:id", ValidateToken, getUserById);

/**
 * @swagger
 * /api/user/users:
 *   post:
 *     summary: Crear usuario
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/users", ValidateToken, createUser);

/**
 * @swagger
 * /api/user/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/users/:id", ValidateToken, updateUser);

/**
 * @swagger
 * /api/user/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete("/users/:id", ValidateToken, deleteUser);

module.exports = router;
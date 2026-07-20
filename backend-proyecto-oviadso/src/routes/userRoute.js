const express = require('express');
const router = express.Router();

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
router.get("/users", getAllUsers);

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
router.get("/users/:id", getUserById);

/**
 * @swagger
 * /api/user/users:
 *   post:
 *     summary: Crear usuario
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/users", createUser);

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
router.put("/users/:id", updateUser);

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
router.delete("/users/:id", deleteUser);

module.exports = router;
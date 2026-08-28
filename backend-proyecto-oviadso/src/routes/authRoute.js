const express = require("express");
const router = express.Router();


const {
    login,
    forgotPassword,
    newPassword,
    resetPassword
} = require("../controllers/authController");



// Login
router.post("/login", login);


// Recuperar Contraseña
router.post("/forgot-password", forgotPassword);



// Nueva Contraseña
router.post("/new-password", newPassword);



// Restablecer Contraseña
router.post("/reset-password", resetPassword);


module.exports = router;
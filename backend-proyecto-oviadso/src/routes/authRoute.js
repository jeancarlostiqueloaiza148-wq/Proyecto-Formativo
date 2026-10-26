const express = require("express");

const {
    login,
    forgotPassword,
    verifyResetToken,
    resetPassword
} = require("../controllers/authController");

const router = express.Router();


// Login
router.post("/login", login);


// Solicitar cambio de contraseña
router.post("/forgot-password", forgotPassword);



// Validar token de recuperación
router.post("/verify-reset-token", verifyResetToken);


// Restablecer contraseña
router.post("/reset-password", resetPassword);


module.exports = router;
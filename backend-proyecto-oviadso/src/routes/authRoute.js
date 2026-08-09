const express = require("express");
const router = express.Router();

// Importar controllers
const {
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");


// LOGIN

router.post("/login", login);


// Recuperar de contraseña

router.post("/forgot-password", forgotPassword);


// Restablecer contraseña

router.post("/reset-password", resetPassword);

module.exports = router;
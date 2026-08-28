const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { Response } = require("../functions/response");

const {
    getUserByUsername,
    getUserByEmail,
    saveResetPasswordToken,
    getUserByResetToken
} = require("../services/userService");

dotenv.config();

const JWT_KEY_SECRET =
    process.env.JWT_KEY_SECRET || "3247890sihsdfg2345sdfg";



// Login
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            const response = new Response(
                false,
                "Error en el login",
                "Usuario y contraseña son obligatorios"
            );

            return res.status(400).json(response.json);
        }

        const user = await getUserByUsername(userName);

        if (!user) {
            const response = new Response(
                false,
                "Error en el login",
                "Usuario o contraseña incorrectos"
            );

            return res.status(401).json(response.json);
        }

        if (!user.active) {
            const response = new Response(
                false,
                "Error en el login",
                "El usuario está inactivo"
            );

            return res.status(403).json(response.json);
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            const response = new Response(
                false,
                "Error en el login",
                "Usuario o contraseña incorrectos"
            );

            return res.status(401).json(response.json);
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_KEY_SECRET,
            {
                expiresIn: "2h"
            }
        );

        const response = new Response(
            true,
            "Login exitoso",
            {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
        );

        return res.status(200).json(response.json);

    } catch (error) {
        console.error("Error en login:", error);

        const response = new Response(
            false,
            "Error interno en el login",
            error.message
        );

        return res.status(500).json(response.json);
    }
};



// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                mensaje: "El correo es obligatorio"
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                mensaje: "No existe un usuario con ese correo"
            });
        }

        // Generar token de recuperación
        const token = crypto.randomBytes(32).toString("hex");

        // El token expira en 1 hora
        const expires = new Date(
            Date.now() + 60 * 60 * 1000
        );

        // Guardar token
        await saveResetPasswordToken(
            user.id,
            token,
            expires
        );

        console.log("Token de recuperación:", token);

        return res.status(200).json({
            mensaje: "Solicitud de recuperación procesada correctamente",
            token: token
        });

    } catch (error) {
        console.error("Error en forgotPassword:", error);

        return res.status(500).json({
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};



// New Password

const newPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        // Validar nueva contraseña
        if (!newPassword) {
            return res.status(400).json({
                mensaje: "La nueva contraseña es obligatoria"
            });
        }

        // Validar longitud
        if (newPassword.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener mínimo 6 caracteres"
            });
        }

        return res.status(200).json({
            mensaje: "Nueva contraseña recibida correctamente",
            newPassword: newPassword
        });

    } catch (error) {
        console.error("Error en newPassword:", error);

        return res.status(500).json({
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};


// Reset Password

const resetPassword = async (req, res) => {
    try {
        const {
            token,
            newPassword
        } = req.body;

        // Validar token
        if (!token) {
            return res.status(400).json({
                mensaje: "El token es obligatorio"
            });
        }

        // Validar newPassword
        if (!newPassword) {
            return res.status(400).json({
                mensaje: "La nueva contraseña es obligatoria"
            });
        }

        // Validar longitud
        if (newPassword.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener mínimo 6 caracteres"
            });
        }

        // Buscar usuario mediante el token
        const user = await getUserByResetToken(token);

        if (!user) {
            return res.status(400).json({
                mensaje: "El token de recuperación no es válido"
            });
        }

        // Verificar expiración
        if (
            !user.resetPasswordExpires ||
            new Date() > new Date(user.resetPasswordExpires)
        ) {
            return res.status(400).json({
                mensaje: "El token de recuperación ha expirado"
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Actualizar contraseña
        await user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        });

        return res.status(200).json({
            mensaje: "Contraseña restablecida correctamente"
        });

    } catch (error) {
        console.error("Error en resetPassword:", error);

        return res.status(500).json({
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};


module.exports = {
    login,
    forgotPassword,
    newPassword,
    resetPassword
};
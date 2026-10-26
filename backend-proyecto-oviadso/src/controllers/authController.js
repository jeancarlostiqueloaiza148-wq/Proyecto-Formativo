
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Response } = require("../functions/response");

const {
  getEmailUser,
  getUserByEmail,
  saveResetPasswordToken,
  getUserByResetToken,
} = require("../services/userService");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../services/emailService");
const fs = require("fs");
const path = require("path");

//Cargar variables de entorno
dotenv.config();

//Clave secreta para JWT
const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "3247890sihsdfg2345sdfg";

//Login
const login = async (req, res) => {
  try {
    // Obtener datos
    const { email, password } = req.body;

    //Validar información
    if (!email || !password) {
      const response = new Response(
        false,
        "Error en el login",
        "Usuario y contraseña no contienen informacion",
      );

      return res.status(400).json(response.json);
    }

    console.log("email:", email);

    //Buscar usuario
    const user = await getEmailUser(email);

    //Validar usuario
    if (!user) {
      const response = new Response(
        false,
        "Error en el login",
        "Usuario y contraseña incorrectos",
      );

      return res.status(400).json(response.json);
    }

    console.log("user:", user);

    //Comparar contraseña
    const passwordCorrect = await bcrypt.compare(password, user.password);

    //Validar contraseña
    if (!passwordCorrect) {
      const response = new Response(
        false,
        "Error en el login",
        "Usuario o contraseña incorrectos",
      );

      return res.status(401).json(response.json);
    }

    //Crear token JWT
    const token = jwt.sign(
      {
        id: user.id,
        uuid: user.uuid,
        username: user.username,
        role: user.role,
        id_rol: user.id_rol,
      },
      JWT_KEY_SECRET,
      {
        expiresIn: "2h",
      },
    );

    //Respuesta
    const response = new Response(
      true,
      "Login exitoso",
      {
        token,
        user: {
          id: user.id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          id_rol: user.id_rol,
        },
      },
    );

    return res.status(200).json(response.json);
  } catch (error) {
    console.error("Error en login:", error);

    const response = new Response(
      false,
      "Error interno en el login",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

//Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const response = new Response(
      true,
      "Solicitud procesada",
      "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
    );

    if (!email) {
      return res.status(200).json(response.json);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(200).json(response.json);
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Expiración de una hora
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Guardar el token original en la base de datos
    await saveResetPasswordToken(user.id, resetToken, resetTokenExpires);

    // Codificar el token para el enlace
    const token = Buffer.from(resetToken).toString("base64");

    // Crear enlace
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const resetLink = `${frontendUrl}/newPassword?token=${encodeURIComponent(token)}`;

    // Cargar configuración de la plantilla
    const templateConfig = JSON.parse(
      await fs.promises.readFile(
      path.join(__dirname, "../../public/templates/resetPassword.json"),
        "utf8",
      ),
    );

    // Cargar plantilla HTML
    const htmlPath = path.join(__dirname, "../../public/html/resetPassword.html");

    let html = await fs.promises.readFile(htmlPath, "utf8");

    // Reemplazar parámetros de la plantilla
    html = html
      .replace(/@name/g, user.username || user.email)
      .replace(/@link/g, resetLink)
      .replace(/@nameBtn/g, "Restablecer contraseña");

    // Contenido de texto del correo
    const text = `Hola, ${user.username || user.email}. Restablece tu contraseña aquí: ${resetLink}`;

    // Enviar correo con la plantilla HTML
    await sendEmail(
      user.email,
      templateConfig.subject,
      text,
      html,
    );

    return res.status(200).json(response.json);
  } catch (error) {
    console.error("Error en forgotPassword:", error);

    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    });
  }
};

//Verificar token de restablecimiento de contraseña
const verifyResetToken = async (req, res) => {
  try {
    //Obtener token del body
    const { token } = req.body;

    //Validar token
    if (!token) {
      return res.status(400).json({
        success: false,
        mensaje: "Token de recuperación requerido",
      });
    }

    //Decodificar token
    const decodedToken = Buffer.from(token, "base64").toString("utf8");

    //Buscar usuario
    const user = await getUserByResetToken(decodedToken);

    //Validar usuario
    if (!user) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación no es válido",
      });
    }

    //Validar expiración
    if (
      !user.resetPasswordExpires ||
      new Date() > new Date(user.resetPasswordExpires)
    ) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación ha expirado",
      });
    }

    //Token válido
    return res.status(200).json({
      success: true,
      mensaje: "Token válido",
      data: {
        valid: true,
      },
    });
  } catch (error) {
    console.error("Error en verifyResetToken:", error);

    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    });
  }
};

//Restablecer contraseña
const resetPassword = async (req, res) => {
  try {
    //Obtener datos del body
    const { token, newPassword, confirmPassword } = req.body;

    console.log("¿Llegó el token?", Boolean(token));

    //Validar token
    if (!token) {
      return res.status(400).json({
        success: false,
        mensaje: "Token de recuperación requerido",
      });
    }

    //Decodificar token
    const decodedToken = Buffer.from(token, "base64").toString("utf8");

    const user = await getUserByResetToken(decodedToken);

    //Validar usuario
    if (!user) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación no es válido",
      });
    }

    //Validar expiración
    if (
      !user.resetPasswordExpires ||
      new Date() > new Date(user.resetPasswordExpires)
    ) {
      return res.status(400).json({
        success: false,
        mensaje: "El token de recuperación ha expirado",
      });
    }

    // Validar nueva contraseña
    if (!newPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "La nueva contraseña es obligatoria",
      });
    }

    //Validar confirmación
    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "Debe confirmar la nueva contraseña",
      });
    }

    // Validar longitud
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        mensaje: "La contraseña debe tener mínimo 6 caracteres",
      });
    }

    // Validar coincidencia
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        mensaje: "Las contraseñas no coinciden",
      });
    }

    //Generar nuevo salt
    const salt = await bcrypt.genSalt(10);

    //Cifrar nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //Actualizar usuario
    await user.update({
      password: hashedPassword,
      salt: salt,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      solicitud_password: false,
    });

    //Respuesta
    return res.status(200).json({
      success: true,
      mensaje: "Contraseña restablecida correctamente",
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);

    return res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};

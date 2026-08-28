const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "../../public/html/confirmEmail.html"),
  "utf8",
);

const {
  AllUsers: getAllUsersService,
  getUserById: getUserByIdService,
  createUserService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
} = require("../services/userService");

const { Response } = require("../functions/response");
const { sendEmail } = require("../services/emailService");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const queryLimit = req.query.limit;
    const queryOffset = req.query.offset;

    //2. Convertir y validar los datos usando la funcion contructora Number
    const limit = queryLimit ? Number(queryLimit) : 10;
    const offset = queryOffset ? Number(queryOffset) : 0;


    const body = req.body;
    console.log("Body recibido:", body);

    const users = await getAllUsersService(limit,offset);

    return res.status(200).json({
      mensaje: "Obteniendo todos los usuarios",
      data: users,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);

    return res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Obteniendo el usuario con ID: ${id}`,
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);

    return res.status(500).json({
      mensaje: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      postJob,
      verifyEmail,
      active,
      status,
      documentId,
    } = req.body;

    let errors = [];

    if (
      !username ||
      !email ||
      !password ||
      !role ||
      !postJob ||
      verifyEmail === undefined ||
      active === undefined ||
      !status ||
      !documentId
    ) {
      errors.push("Todos los campos son obligatorios");
    }

    if (username === "") errors.push("El campo username no puede estar vacío");
    if (email === "") errors.push("El campo email no puede estar vacío");
    if (password === "") errors.push("El campo password no puede estar vacío");
    if (role === "") errors.push("El campo role no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (status === "") errors.push("El campo status no puede estar vacío");
    if (documentId === "")
      errors.push("El campo documentId no puede estar vacío");

    if (errors.length > 0) {
      const response = new Response(false, "Error al crear el usuario", errors);

      return res.status(400).json(response.json);
    }

    const data = {
      username,
      email,
      password,
      role,
      postJob,
      verifyEmail,
      active,
      status,
      documentId,
    };

    const user = await createUserService(data);

    // Inicio de envío de correo de confirmación
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "confirmEmail.json",
    );

    // Leer el archivo de template
    const confirmEmailTemplate = fs.readFileSync(templatePath);

    // Leer y sacar propiedades del template
    const dataTemplate = JSON.parse(confirmEmailTemplate);

    // Reemplazar los valores en el template con los datos del usuario
    dataTemplate.params["@name"] = user.username;
    dataTemplate.params["@link"] = "http://localhost:3000/confirm-email";
    dataTemplate.params["@nameBtn"] = "Confirmar correo";

    // Leer el archivo HTML del template
    const templateHtml = fs.readFileSync(dataTemplate.html);

    let html = templateHtml.toString();

    for (const key in dataTemplate.params) {
      html = html.replace(key, dataTemplate.params[key]);
    }

    await sendEmail(user.email, dataTemplate.subject, "", html);

    const response = new Response(true, "Usuario creado exitosamente", user);

    return res.status(201).json(response.json);
  } catch (error) {
    console.error("Error al crear el usuario:", error);

    const response = new Response(
      false,
      "Error interno al crear el usuario",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      username,
      email,
      password,
      role,
      postJob,
      verifyEmail,
      active,
      status,
      documentId,
    } = req.body;

    const updatedUser = await updateUserService(id, {
      username,
      email,
      password,
      role,
      postJob,
      verifyEmail,
      active,
      status,
      documentId,
    });

    return res.status(200).json({
      mensaje: `Usuario actualizado con ID: ${id}`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);

    const response = new Response(
      false,
      "Error interno al actualizar el usuario",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Inactivar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await deleteUserService(id);

    if (updated === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Usuario con ID ${id} inactivado correctamente`,
    });
  } catch (error) {
    console.error("Error al inactivar el usuario:", error);

    return res.status(500).json({
      mensaje: "Error al inactivar el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
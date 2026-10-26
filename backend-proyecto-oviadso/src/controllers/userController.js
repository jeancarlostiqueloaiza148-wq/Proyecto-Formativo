const fs = require("fs");
const path = require("path");

const {
  AllUsers: getAllUsersService,
  getUserById: getUserByIdService,
  countUsers: countUsersService,
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

    const limit = queryLimit
      ? Number(queryLimit)
      : 10;

    const offset = queryOffset
      ? Number(queryOffset)
      : 0;

    const users = await getAllUsersService(
      limit,
      offset
    );

    const total = await countUsersService();

    return res.status(200).json({
      mensaje: "Obteniendo todos los usuarios",
      data: users,
      total: total,
      totalPages: Math.ceil(total / limit),
      currentPage: Math.floor(offset / limit) + 1
    });

  } catch (error) {
    console.error(
      "Error al obtener los usuarios:",
      error
    );

    return res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error: error.message
    });
  }
};

//Obtener usuario por id
const getUserById = async (req, res) => {

  try {

    const { id } = req.params;

    const user =
      await getUserByIdService(id);

    if (!user) {

      return res.status(404).json({

        mensaje: "Usuario no encontrado"

      });

    }

    return res.status(200).json({

      mensaje:
        `Obteniendo el usuario con ID: ${id}`,

      data: user

    });

  } catch (error) {

    console.error(
      "Error al obtener el usuario:",
      error
    );

    return res.status(500).json({

      mensaje: "Error al obtener el usuario",

      error: error.message

    });

  }
};


//Crear usuario
const createUser = async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      id_rol,
      postJob,
      verifyEmail,
      active,
      status,
      documentId
    } = req.body;


    let errors = [];


    //Validaciones
    if (!username) {

      errors.push(
        "El campo username es obligatorio"
      );

    }

    if (!email) {

      errors.push(
        "El campo email es obligatorio"
      );

    }

    if (!password) {

      errors.push(
        "El campo password es obligatorio"
      );

    }

    if (!id_rol) {

      errors.push(
        "El campo id_rol es obligatorio"
      );

    }

    if (postJob === undefined) {

      errors.push(
        "El campo postJob es obligatorio"
      );

    }

    if (verifyEmail === undefined) {

      errors.push(
        "El campo verifyEmail es obligatorio"
      );

    }

    if (active === undefined) {

      errors.push(
        "El campo active es obligatorio"
      );

    }

    if (status === undefined) {

      errors.push(
        "El campo status es obligatorio"
      );

    }

    if (!documentId) {

      errors.push(
        "El campo documentId es obligatorio"
      );

    }


    //Validar errores
    if (errors.length > 0) {

      const response = new Response(
        false,
        "Error al crear el usuario",
        errors
      );

      return res
        .status(400)
        .json(response.json);

    }


    const data = {

      username,
      email,
      password,
      id_rol,
      postJob,
      verifyEmail,
      active,
      status,
      documentId

    };


    //Crear usuario
    const user =
      await createUserService(data);


    
    //Correo de confirmación
    const templatePath = path.join(

      process.cwd(),

      "public",

      "templates",

      "confirmEmail.json"

    );


    const confirmEmailTemplate =
      fs.readFileSync(
        templatePath,
        "utf8"
      );


    const dataTemplate =
      JSON.parse(
        confirmEmailTemplate
      );


    dataTemplate.params["@name"] =
      user.username;


    dataTemplate.params["@link"] =
      "http://localhost:3000/confirm-email";


    dataTemplate.params["@nameBtn"] =
      "Confirmar correo";


    const templateHtml =
      fs.readFileSync(
        dataTemplate.html,
        "utf8"
      );


    let html = templateHtml;


    for (
      const key in dataTemplate.params
    ) {

      html = html.replace(
        key,
        dataTemplate.params[key]
      );

    }


    await sendEmail(

      user.email,

      dataTemplate.subject,

      "",

      html

    );


    const response = new Response(

      true,

      "Usuario creado exitosamente",

      user

    );


    return res
      .status(201)
      .json(response.json);


  } catch (error) {

    console.error(
      "Error al crear el usuario:",
      error
    );


    const response = new Response(

      false,

      "Error interno al crear el usuario",

      error.message

    );


    return res
      .status(500)
      .json(response.json);

  }
};


//Actualizar usuario
const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      username,
      email,
      password,
      id_rol,
      postJob,
      verifyEmail,
      active,
      status,
      documentId
    } = req.body;


    const updatedUser =
      await updateUserService(

        id,

        {
          username,
          email,
          password,
          id_rol,
          postJob,
          verifyEmail,
          active,
          status,
          documentId
        }

      );


    return res.status(200).json({

      mensaje:
        `Usuario actualizado con ID: ${id}`,

      user: updatedUser

    });


  } catch (error) {

    console.error(
      "Error al actualizar el usuario:",
      error
    );


    const response = new Response(

      false,

      "Error interno al actualizar el usuario",

      error.message

    );


    return res
      .status(500)
      .json(response.json);

  }
};


//Inactivar usuario
const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    const [updated] =
      await deleteUserService(id);


    if (updated === 0) {

      return res.status(404).json({

        mensaje:
          "Usuario no encontrado"

      });

    }


    return res.status(200).json({

      mensaje:
        `Usuario con ID ${id} inactivado correctamente`

    });


  } catch (error) {

    console.error(
      "Error al inactivar el usuario:",
      error
    );


    return res.status(500).json({

      mensaje:
        "Error al inactivar el usuario",

      error:
        error.message

    });

  }
};


module.exports = {

  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
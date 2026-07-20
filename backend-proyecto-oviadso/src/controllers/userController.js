const {
    createUserService,
    updateUser: updateUserService,
    deleteUser: deleteUserService
} = require("../services/userService");

const { Response } = require("../functions/response");

const getAllUsers = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todos los usuarios"
    });
};

const getUserById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo el usuario con ID: ${id}`
    });
};

const createUser = async (req, res) => {

    const {
        username,
        email,
        password,
        role,
        postJob,
        verifyEmail,
        active,
        status,
        documentId
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
    if (documentId === "") errors.push("El campo documentId no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al crear el usuario",
            errors
        );

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
        documentId
    };

    try {

        const user = await createUserService(data);

        const response = new Response(
            true,
            "Usuario creado exitosamente",
            user
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al crear el usuario:", error);

        const response = new Response(
            false,
            "Error interno al crear el usuario",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

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
            documentId
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
            documentId
        });

        return res.status(200).json({
            mensaje: `Usuario actualizado con ID: ${id}`,
            user: updatedUser
        });

    } catch (error) {

        console.error("Error al actualizar el usuario:", error);

        const response = new Response(
            false,
            "Error interno al actualizar el usuario",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const [updated] = await deleteUserService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: `Usuario con ID ${id} inactivado correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar el usuario"
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
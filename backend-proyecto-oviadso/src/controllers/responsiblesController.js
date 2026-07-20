const {
    createResponsibleService,
    updateResponsible: updateResponsibleService,
    deleteResponsible: deleteResponsibleService
} = require("../services/responsiblesService");

const { Response } = require("../functions/response");

const getAllResponsibles = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todos los responsables"
    });

};

const getResponsibleById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo el responsable con ID: ${id}`
    });

};

const createResponsible = async (req, res) => {

    const {
        name,
        lastname,
        document,
        postJob,
        active,
        phone,
        email,
    } = req.body;

    let errors = [];

    if (!name || !lastname || !document || !postJob || !active || !phone || !email) {
        errors.push("Todos los campos son obligatorios");
    }

    if (name === "") errors.push("El campo name no puede estar vacío");
    if (lastname === "") errors.push("El campo lastname no puede estar vacío");
    if (document === "") errors.push("El campo document no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (phone === "") errors.push("El campo phone no puede estar vacío");
    if (email === "") errors.push("El campo email no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al crear el responsable",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        name,
        lastname,
        document,
        postJob,
        active,
        phone,
        email
    };

    try {

        const responsible = await createResponsibleService(data);

        const response = new Response(
            true,
            "Responsable creado exitosamente",
            responsible
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al crear el responsable:", error);

        const response = new Response(
            false,
            "Error interno al crear el responsable",
            error.message
        );

        return res.status(500).json(response.json);

    }

};

const updateResponsible = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            lastname,
            document,
            postJob,
            active,
            phone,
            email
        } = req.body;

        const updatedResponsible = await updateResponsibleService(id, {
            name,
            lastname,
            document,
            postJob,
            active,
            phone,
            email
        });

        return res.status(200).json({
            mensaje: `Responsable actualizado con ID: ${id}`,
            responsible: updatedResponsible
        });

    } catch (error) {

        console.error("Error al actualizar el responsable:", error);

        const response = new Response(
            false,
            "Error interno al actualizar el responsable",
            error.message
        );

        return res.status(500).json(response.json);

    }
};

const deleteResponsible = async (req, res) => {
    try {

        const { id } = req.params;

        const [updated] = await deleteResponsibleService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Responsable no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: `Responsable con ID ${id} inactivado correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar el responsable"
        });

    }
};

module.exports = {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};
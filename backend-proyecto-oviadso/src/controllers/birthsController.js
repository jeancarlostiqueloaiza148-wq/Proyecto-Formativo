const {
    createBirthService,
    updateBirth: updateBirthService,
    deleteBirth: deleteBirthService
} = require("../services/birthService");

const { Response } = require("../functions/response");

const getAllBirths = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todos los nacimientos"
    });
};

const getBirthById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo el nacimiento con ID: ${id}`
    });
};

const createBirth = async (req, res) => {

    const {
        date,
        ovine_id,
        mother_id,
        weight,
        status,
        postJob,
        active,
        notes
    } = req.body;

    let errors = [];

    if (!date || !ovine_id || !mother_id || !weight || !status || !postJob || !active  || !notes) {
        errors.push("Todos los campos son obligatorios");
    }

    if (date === "") errors.push("El campo date no puede estar vacío");
    if (ovine_id === "") errors.push("El campo ovine_id no puede estar vacío");
    if (mother_id === "") errors.push("El campo mother_id no puede estar vacío");
    if (weight === "") errors.push("El campo weight no puede estar vacío");
    if (status === "") errors.push("El campo status no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");
    if (notes === "") errors.push("El campo notes no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al crear el registro de nacimiento",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        date,
        ovine_id,
        mother_id,
        weight,
        status,
        postJob,
        active,
        notes
    };

    try {

        const birth = await createBirthService(data);

        const response = new Response(
            true,
            "Nacimiento registrado exitosamente",
            birth
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al registrar el nacimiento:", error);

        const response = new Response(
            false,
            "Error interno al registrar el nacimiento",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

const updateBirth = async (req, res) => {

    try {

        const { id } = req.params;

        const {
           date,
           ovine_id,
           mother_id,
           weight,
           status,
           postJob,
           active,
           notes
        } = req.body;

        const updatedBirth = await updateBirthService(id, {
            date,
            ovine_id,
            mother_id,
            weight,
            status,
            postJob,
            active,
            notes
        });

        return res.status(200).json({
            mensaje: `Nacimiento actualizado con ID: ${id}`,
            birth: updatedBirth
        });

    } catch (error) {

        console.error("Error al actualizar el nacimiento:", error);

        const response = new Response(
            false,
            "Error interno al actualizar el nacimiento",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

const deleteBirth = async (req, res) => {

    try {

        const { id } = req.params;

        const [updated] = await deleteBirthService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Nacimiento no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: `Nacimiento con ID ${id} inactivado correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar el nacimiento"
        });
    }
};

module.exports = {
    getAllBirths,
    getBirthById,
    createBirth,
    updateBirth,
    deleteBirth
};
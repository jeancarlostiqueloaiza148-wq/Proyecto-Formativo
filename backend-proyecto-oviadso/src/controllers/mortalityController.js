const {
    createMortalityService,
    updateMortality: updateMortalityService,
    deleteMortality: deleteMortalityService
} = require("../services/mortalityService");

const { Response } = require("../functions/response");

const getAllMortalities = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todas las mortalidades"
    });
};

const getMortalityById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo la mortalidad con ID: ${id}`
    });
};

const createMortality = async (req, res) => {

    const {
        date,
        ovine_id,
        cause,
        postJob,
        active,
        description
    } = req.body;

    let errors = [];

    if (!date || !ovine_id || !cause || !postJob || ! active || !description) {
        errors.push("Todos los campos son obligatorios");
    }

    if (date === "") errors.push("El campo date no puede estar vacío");
    if (ovine_id === "") errors.push("El campo ovine_id no puede estar vacío");
    if (cause === "") errors.push("El campo cause no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (active === "") errors.push("El campo activete no puede estar vacío");
    if (description === "") errors.push("El campo description no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al registrar la mortalidad",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        date,
        ovine_id,
        cause,
        postJob,
        active,
        description
    };

    try {

        const mortality = await createMortalityService(data);

        const response = new Response(
            true,
            "Mortalidad registrada exitosamente",
            mortality
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al registrar la mortalidad:", error);

        const response = new Response(
            false,
            "Error interno al registrar la mortalidad",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

const updateMortality = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            date,
            ovine_id,
            cause,
            postJob,
            active,
            description
        } = req.body;

        const updatedMortality = await updateMortalityService(id, {
              date,
              ovine_id,
              cause,
              postJob,
              active,
              description
        });

        return res.status(200).json({
            mensaje: `Mortalidad actualizada con ID: ${id}`,
            mortality: updatedMortality
        });

    } catch (error) {

        console.error("Error al actualizar la mortalidad:", error);

        const response = new Response(
            false,
            "Error interno al actualizar la mortalidad",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

const deleteMortality = async (req, res) => {

    try {

        const { id } = req.params;

        const [updated] = await deleteMortalityService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Mortalidad no encontrada"
            });
        }

        return res.status(200).json({
            mensaje: `Mortalidad con ID ${id} inactivada correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar la mortalidad"
        });
    }
};

module.exports = {
    getAllMortalities,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
};
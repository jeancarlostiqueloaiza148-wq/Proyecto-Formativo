const {
    createMountingService,
    updateMounting: updateMountingService,
    deleteMounting: deleteMountingService
} = require("../services/mountingService");

const { Response } = require("../functions/response");

// Obtener todas las montas
const getAllMountings = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todas las montas"
    });
};

// Obtener monta por ID
const getMountingById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo la monta con ID: ${id}`
    });
};

// Crear monta
const createMounting = async (req, res) => {

    const {
        type_of_mounting,
        result_mounting,
        breeding_male,
        active
    } = req.body;

    let errors = [];

    if (!type_of_mounting || !result_mounting || !breeding_male || !active) {
        errors.push("Todos los campos son obligatorios");
    }

    if (type_of_mounting === "") errors.push("El campo type_of_mounting no puede estar vacío");
    if (result_mounting  === "") errors.push("El campo result_mounting  no puede estar vacío");
    if (breeding_male === "") errors.push("El campo breeding_maleno no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al crear la monta",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        type_of_mounting,
        result_mounting,
        breeding_male,
        active
    };

    try {

        const mounting = await createMountingService(data);

        const response = new Response(
            true,
            "Monta registrada exitosamente",
            mounting
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al registrar la monta:", error);

        const response = new Response(
            false,
            "Error interno al registrar la monta",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

// Actualizar monta
const updateMounting = async (req, res) => {

    try {

        const { id } = req.params;

        const {
        type_of_mounting,
        result_mounting,
        breeding_male,
        active
        } = req.body;

        const updatedMounting = await updateMountingService(id, {
        type_of_mounting,
        result_mounting,
        breeding_male,
        active
        });

        return res.status(200).json({
            mensaje: `Monta actualizada con ID: ${id}`,
            mounting: updatedMounting
        });

    } catch (error) {

        console.error("Error al actualizar la monta:", error);

        const response = new Response(
            false,
            "Error interno al actualizar la monta",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

// Inactivar monta
const deleteMounting = async (req, res) => {

    try {

        const { id } = req.params;

        const [updated] = await deleteMountingService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Monta no encontrada"
            });
        }

        return res.status(200).json({
            mensaje: `Monta con ID ${id} inactivada correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar la monta"
        });
    }
};

module.exports = {
    getAllMountings,
    getMountingById,
    createMounting,
    updateMounting,
    deleteMounting
};
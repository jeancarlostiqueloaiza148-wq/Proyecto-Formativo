const {
    createOvineService,
    updateOvine: updateOvineService,
    deleteOvine: deleteOvineService
} = require("../services/ovineService");

const { Response } = require("../functions/response");

// Obtener todos los ovinos
const getAllOvines = (req, res) => {

    const body = req.body;
    console.log("Body recibido:", body);

    res.status(200).json({
        mensaje: "Obteniendo todos los ovinos"
    });
};

// Obtener ovino por ID
const getOvineById = (req, res) => {

    const { id } = req.params;

    res.json({
        mensaje: `Obteniendo el ovino con ID: ${id}`
    });
};

// Crear ovino
const createOvine = async (req, res) => {

    const {
        name,
        tag,
        breed,
        sex,
        birth_date,
        weight,
        status,
        active
    } = req.body;

    let errors = [];

    if (!name || !tag || !breed || !sex || !birth_date || !weight || !status || !active) {
        errors.push("Todos los campos son obligatorios");
    }

    if (name === "") errors.push("El campo name no puede estar vacío");
    if (tag === "") errors.push("El campo tag no puede estar vacío");
    if (breed === "") errors.push("El campo breed no puede estar vacío");
    if (sex === "") errors.push("El campo sex no puede estar vacío");
    if (birth_date === "") errors.push("El campo birth_date no puede estar vacío");
    if (weight === "") errors.push("El campo weight no puede estar vacío");
    if (status === "") errors.push("El campo status no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");

    if (errors.length > 0) {

        const response = new Response(
            false,
            "Error al crear el ovino",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        name,
        tag,
        breed,
        sex,
        birth_date,
        weight,
        status,
        active,
    };

    try {

        const ovine = await createOvineService(data);

        const response = new Response(
            true,
            "Ovino registrado exitosamente",
            ovine
        );

        return res.status(201).json(response.json);

    } catch (error) {

        console.error("Error al registrar el ovino:", error);

        const response = new Response(
            false,
            "Error interno al registrar el ovino",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

// Actualizar ovino
const updateOvine = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            tag,
            breed,
            sex,
            birth_date,
            weight,
            status,
            active
        } = req.body;

        const updatedOvine = await updateOvineService(id, {
            name,
            tag,
            breed,
            sex,
            birth_date,
            weight,
            status,
            active
        });

        return res.status(200).json({
            mensaje: `Ovino actualizado con ID: ${id}`,
            ovine: updatedOvine
        });

    } catch (error) {

        console.error("Error al actualizar el ovino:", error);

        const response = new Response(
            false,
            "Error interno al actualizar el ovino",
            error.message
        );

        return res.status(500).json(response.json);
    }
};

// Inactivar ovino
const deleteOvine = async (req, res) => {

    try {

        const { id } = req.params;

        const [updated] = await deleteOvineService(id);

        if (updated === 0) {
            return res.status(404).json({
                mensaje: "Ovino no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: `Ovino con ID ${id} inactivado correctamente`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al inactivar el ovino"
        });
    }
};

module.exports = {
    getAllOvines,
    getOvineById,
    createOvine,
    updateOvine,
    deleteOvine
};
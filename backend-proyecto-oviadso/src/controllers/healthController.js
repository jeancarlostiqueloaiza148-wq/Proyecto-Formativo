const {
  getAllHealths: getAllHealthsService,
  getHealthById: getHealthByIdService,
  createHealthService,
  updateHealth: updateHealthService,
  deleteHealth: deleteHealthService,
} = require("../services/healthService");

const { Response } = require("../functions/response");

// Obtener todas las sanidades
const getAllHealths = async (req, res) => {
  try {
    const body = req.body;
    console.log("Body recibido:", body);

    const healths = await getAllHealthsService();

    return res.status(200).json({
      mensaje: "Obteniendo todos los registros de sanidad",
      data: healths,
    });
  } catch (error) {
    console.error("Error al obtener los registros de sanidad:", error);

    return res.status(500).json({
      mensaje: "Error al obtener los registros de sanidad",
      error: error.message,
    });
  }
};

// Obtener sanidad por ID
const getHealthById = async (req, res) => {
  try {
    const { id } = req.params;

    const health = await getHealthByIdService(id);

    if (!health) {
      return res.status(404).json({
        mensaje: "Registro de sanidad no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Obteniendo el registro de sanidad con ID: ${id}`,
      data: health,
    });
  } catch (error) {
    console.error("Error al obtener el registro de sanidad:", error);

    return res.status(500).json({
      mensaje: "Error al obtener el registro de sanidad",
      error: error.message,
    });
  }
};

// Crear sanidad
const createHealth = async (req, res) => {
  try {
    const {
      date,
      ovine_id,
      diagnosis,
      treatment,
      postJob,
      active,
      observations,
      vaccine_id,
      vaccine_name,
    } = req.body;

    let errors = [];

    if (
      !date ||
      !ovine_id ||
      !diagnosis ||
      !treatment ||
      !postJob ||
      !active ||
      !observations ||
      !vaccine_id ||
      !vaccine_name
    ) {
      errors.push("Todos los campos son obligatorios");
    }

    if (date === "") errors.push("El campo date no puede estar vacío");
    if (ovine_id === "") errors.push("El campo ovine_id no puede estar vacío");
    if (diagnosis === "")
      errors.push("El campo diagnosis no puede estar vacío");
    if (treatment === "")
      errors.push("El campo treatment no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");
    if (observations === "")
      errors.push("El campo observations no puede estar vacío");
    if (vaccine_id === "")
      errors.push("El campo vaccine_id no puede estar vacío");
    if (vaccine_name === "")
      errors.push("El campo vaccine_name no puede estar vacío");

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al crear el registro de salud",
        errors,
      );

      return res.status(400).json(response.json);
    }

    const data = {
      date,
      ovine_id,
      diagnosis,
      treatment,
      postJob,
      active,
      observations,
      vaccine_id,
      vaccine_name,
    };

    const health = await createHealthService(data);

    const response = new Response(
      true,
      "Registro de salud creado exitosamente",
      health,
    );

    return res.status(201).json(response.json);
  } catch (error) {
    console.error("Error al crear registro de salud:", error);

    const response = new Response(
      false,
      "Error interno al crear el registro de salud",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Actualizar sanidad
const updateHealth = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      date,
      ovine_id,
      diagnosis,
      treatment,
      postJob,
      active,
      observations,
      vaccine_id,
      vaccine_name,
    } = req.body;

    const updatedHealth = await updateHealthService(id, {
      date,
      ovine_id,
      diagnosis,
      treatment,
      postJob,
      active,
      observations,
      vaccine_id,
      vaccine_name,
    });

    return res.status(200).json({
      mensaje: `Registro de salud actualizado con ID: ${id}`,
      health: updatedHealth,
    });
  } catch (error) {
    console.error("Error al actualizar el registro de salud:", error);

    const response = new Response(
      false,
      "Error interno al actualizar el registro de salud",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Inactivar sanidad
const deleteHealth = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await deleteHealthService(id);

    if (updated === 0) {
      return res.status(404).json({
        mensaje: "Registro de salud no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Registro de salud con ID ${id} inactivado correctamente`,
    });
  } catch (error) {
    console.error("Error al inactivar el registro de salud:", error);

    return res.status(500).json({
      mensaje: "Error al inactivar el registro de salud",
      error: error.message,
    });
  }
};

module.exports = {
  getAllHealths,
  getHealthById,
  createHealth,
  updateHealth,
  deleteHealth,
};
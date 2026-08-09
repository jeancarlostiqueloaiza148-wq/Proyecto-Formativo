const {
  getAllFeedings: getAllFeedingsService,
  getFeedingById: getFeedingByIdService,
  createFeedingService,
  updateFeeding: updateFeedingService,
  deleteFeeding: deleteFeedingService,
} = require("../services/feedingService");

const { Response } = require("../functions/response");

// Obtener todas las alimentaciones
const getAllFeedings = async (req, res) => {
  try {
    const body = req.body;
    console.log("Body recibido:", body);

    const feedings = await getAllFeedingsService();

    res.status(200).json({
      mensaje: "Obteniendo todas las alimentaciones",
      data: feedings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener las alimentaciones",
      error: error.message,
    });
  }
};

// Obtener alimentacion por id
const getFeedingById = async (req, res) => {
  try {
    const { id } = req.params;

    const feeding = await getFeedingByIdService(id);

    if (!feeding) {
      return res.status(404).json({
        mensaje: "Alimentación no encontrada",
      });
    }

    res.status(200).json({
      mensaje: `Obteniendo la alimentación con ID: ${id}`,
      data: feeding,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener la alimentación",
      error: error.message,
    });
  }
};

// Crear alimentacion
const createFeeding = async (req, res) => {
  try {
    const { date, ovine_id, food_type, quantity, postJob, active, notes } =
      req.body;

    let errors = [];

    if (
      !date ||
      !ovine_id ||
      !food_type ||
      !quantity ||
      !postJob ||
      !active ||
      !notes
    ) {
      errors.push("Todos los campos son obligatorios");
    }

    if (date === "") errors.push("El campo date no puede estar vacío");
    if (ovine_id === "") errors.push("El campo ovine_id no puede estar vacío");
    if (food_type === "")
      errors.push("El campo food_type no puede estar vacío");
    if (quantity === "") errors.push("El campo quantity no puede estar vacío");
    if (postJob === "") errors.push("El campo postJob no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");
    if (notes === "") errors.push("El campo notes no puede estar vacío");

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al crear el registro de alimentación",
        errors,
      );

      return res.status(400).json(response.json);
    }

    const data = {
      date,
      ovine_id,
      food_type,
      quantity,
      postJob,
      active,
      notes,
    };

    const feeding = await createFeedingService(data);

    const response = new Response(
      true,
      "Registro de alimentación creado exitosamente",
      feeding,
    );

    return res.status(201).json(response.json);
  } catch (error) {
    console.error("Error al crear el registro de alimentación:", error);

    const response = new Response(
      false,
      "Error interno al crear el registro de alimentación",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Actualizar alimentacion
const updateFeeding = async (req, res) => {
  try {
    const { id } = req.params;

    const { date, ovine_id, food_type, quantity, postJob, active, notes } =
      req.body;

    const updatedFeeding = await updateFeedingService(id, {
      date,
      ovine_id,
      food_type,
      quantity,
      postJob,
      active,
      notes,
    });

    return res.status(200).json({
      mensaje: `Registro de alimentación actualizado con ID: ${id}`,
      feeding: updatedFeeding,
    });
  } catch (error) {
    console.error("Error al actualizar el registro de alimentación:", error);

    const response = new Response(
      false,
      "Error interno al actualizar el registro de alimentación",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Inactivar alimentacion
const deleteFeeding = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await deleteFeedingService(id);

    if (updated === 0) {
      return res.status(404).json({
        mensaje: "Registro de alimentación no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Registro de alimentación con ID ${id} inactivado correctamente`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al inactivar el registro de alimentación",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFeedings,
  getFeedingById,
  createFeeding,
  updateFeeding,
  deleteFeeding,
};
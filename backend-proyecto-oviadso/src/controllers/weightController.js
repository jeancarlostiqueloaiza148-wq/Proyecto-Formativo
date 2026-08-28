const {
  getAllWeights: getAllWeightsService,
  getWeightById: getWeightByIdService,
  createWeightService,
  updateWeight: updateWeightService,
  deleteWeight: deleteWeightService,
} = require("../services/weightService");

const { Response } = require("../functions/response");

// Obtener todos los pesos
const getAllWeights = async (req, res) => {
  try {
    const queryLimit = req.query.limit;
    const queryOffset = req.query.offset;

    //2. Convertir y validar los datos usando la funcion contructora Number
    const limit = queryLimit ? Number(queryLimit) : 10;
    const offset = queryOffset ? Number(queryOffset) : 0;

    const body = req.body;
    console.log("Body recibido:", body);

    const weights = await getAllWeightsService(limit,offset);

    return res.status(200).json({
      mensaje: "Obteniendo todos los pesos",
      data: weights,
    });
  } catch (error) {
    console.error("Error al obtener los pesos:", error);

    return res.status(500).json({
      mensaje: "Error al obtener los pesos",
      error: error.message,
    });
  }
};

// Obtener peso por ID
const getWeightById = async (req, res) => {
  try {
    const { id } = req.params;

    const weight = await getWeightByIdService(id);

    if (!weight) {
      return res.status(404).json({
        mensaje: "Peso no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Obteniendo el peso con ID: ${id}`,
      data: weight,
    });
  } catch (error) {
    console.error("Error al obtener el peso:", error);

    return res.status(500).json({
      mensaje: "Error al obtener el peso",
      error: error.message,
    });
  }
};

// Crear peso
const createWeight = async (req, res) => {
  try {
    const { date, id_ovine, weight, notes, active } = req.body;

    let errors = [];

    if (!date || !id_ovine || !weight || !notes || active === undefined) {
      errors.push("Todos los campos son obligatorios");
    }

    if (date === "") errors.push("El campo date no puede estar vacío");
    if (id_ovine === "") errors.push("El campo id_ovine no puede estar vacío");
    if (weight === "") errors.push("El campo weight no puede estar vacío");
    if (notes === "") errors.push("El campo notes no puede estar vacío");
    if (active === "") errors.push("El campo active no puede estar vacío");

    if (errors.length > 0) {
      const response = new Response(false, "Error al crear el peso", errors);

      return res.status(400).json(response.json);
    }

    const data = {
      date,
      id_ovine,
      weight,
      notes,
      active,
    };

    const weightCreated = await createWeightService(data);

    const response = new Response(
      true,
      "Peso registrado exitosamente",
      weightCreated,
    );

    return res.status(201).json(response.json);
  } catch (error) {
    console.error("Error al registrar el peso:", error);

    const response = new Response(
      false,
      "Error interno al registrar el peso",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Actualizar peso
const updateWeight = async (req, res) => {
  try {
    const { id } = req.params;

    const { date, id_ovine, weight, notes, active } = req.body;

    const updatedWeight = await updateWeightService(id, {
      date,
      id_ovine,
      weight,
      notes,
      active,
    });

    return res.status(200).json({
      mensaje: `Peso actualizado con ID: ${id}`,
      weight: updatedWeight,
    });
  } catch (error) {
    console.error("Error al actualizar el peso:", error);

    const response = new Response(
      false,
      "Error interno al actualizar el peso",
      error.message,
    );

    return res.status(500).json(response.json);
  }
};

// Inactivar peso
const deleteWeight = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await deleteWeightService(id);

    if (updated === 0) {
      return res.status(404).json({
        mensaje: "Peso no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: `Peso con ID ${id} inactivado correctamente`,
    });
  } catch (error) {
    console.error("Error al inactivar el peso:", error);

    return res.status(500).json({
      mensaje: "Error al inactivar el peso",
      error: error.message,
    });
  }
};

module.exports = {
  getAllWeights,
  getWeightById,
  createWeight,
  updateWeight,
  deleteWeight,
};
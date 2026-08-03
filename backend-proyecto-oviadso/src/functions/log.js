const createLog = async (error) => {
  console.error("Error al enviar el correo:");
  console.error(error);
};

module.exports = {
  createLog,
};
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: {
        succes:false,
        message: "Demasiadas solicitudes. Intenta nuevamente en 1 minuto."
    }
});

module.exports = limiter;
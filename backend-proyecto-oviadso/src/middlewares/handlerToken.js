    const jwt = require("jsonwebtoken");
      require("dotenv").config();
      const {Response} = require("../functions/response");

      function ValidateToken(req, res, next) {
            const headers= req.headers['authorization'];
            const token = headers && headers.split(" ")[1];
            console.log("Token recibido:", token);
            if (!token|| token === null || token === undefined) {
                let responseData = new Response(false, "Token no proporcionado", null);
                    return res.status(401).json(responseData.json);
            }
            jwt.verify(token, process.env.JWT_KEY_SECRET, (error, user) => {
                if (error) {
                    let responseData = new Response(false, "Token inválido", null);
                    return res.status(403).json({ message: 'Token inválido' });
                }
                req.user = user;
                next();
            });
      }

      module.exports = {
          ValidateToken,
      };
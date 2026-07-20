const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const {Response} = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "3247890sihsdfg2345sdfg"; 

const login = (req, res) => {
    const { userName, password } = req.body;

    if (userName =="" || password == "") {
        res.status(400)
        const response = new Response("Error en el login", null, "Usuario y contraseña no tienen informacion");

        return res.json(response.json);
    }
    var token = jwt.sign({ user: userName }, JWT_KEY_SECRET);

    const response = new Response("Login successful", { token }, null);
    res.json(response.json);
};

module.exports = {
    login,
};






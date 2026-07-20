const express = require("express");
const app = express();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { info } = require("winston");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Proyecto Oviadso Backend API",
      version: "1.0.0",
      description: "API para el proyecto Oviadso Backend",
    },
    servers: ["http://localhost:3000"],
  },
  basePath: "/",
  apis: ["../routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
// Importa el framework Express para crear el servidor y las rutas
const express = require("express");
const cors = require("cors");

// Importa libreria
const dotenv = require("dotenv");

//Carga el archivo desde el sistema
dotenv.config();

// Importa Helmet para agregar cabeceras de seguridad HTTP
const helmet = require("helmet");

// Importa Morgan para registrar las peticiones HTTP en consola
const morgan = require("morgan");

// Importa Path para trabajar con rutas de archivos y directorios
const path = require("path");

// Importa Swagger UI para mostrar la documentación en una interfaz web
const swaggerUi = require("swagger-ui-express");

// Importa Swagger JSDoc para generar documentación automáticamente
const swaggerJsdoc = require("swagger-jsdoc");

// Configuración principal de Swagger
const swaggerOptions = {
  definition: {
    // Versión de OpenAPI utilizada
    openapi: "3.0.0",

    // Información general de la API
    info: {
      title: "API Ovinos", // Nombre de la API
      version: "1.0.0", // Versión actual
      description: "Documentacion de la API", // Descripción
    },

    // Servidores donde se ejecuta la API
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    // Componentes reutilizables
    components: {
      securitySchemes: {
        // Configuración de autenticación JWT
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    // Aplica autenticación JWT a toda la API
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Archivos donde Swagger buscará documentación
  apis: [path.join(__dirname, "routes/*.js")],
};

// Genera la documentación Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Importa las rutas de usuarios
const userRoute = require("./routes/userRoute");

// Importa las rutas de mortalidad
const mortalityRoute = require("./routes/mortalityRoute");

// Importa las rutas de monta
const mountingRoute = require("./routes/mountingRoute");

// Importa las rutas de partos
const deliveryRoute = require("./routes/deliveryRoute");

// Importa las rutas de peso
const weightRoute = require("./routes/weightRoute");

// Importa las rutas de salud
const healthRoute = require("./routes/healthRoute");

// Importa las rutas de ovinos
const ovineRoute = require("./routes/ovineRoute");

// Importa las rutas de alimentación
const feedingRoute = require("./routes/feedingRoute");

// Importa las rutas de nacimientos
const birthRoute = require("./routes/birthRoute");

// Importa las rutas de responsables
const responsiblesRoute = require("./routes/responsiblesRoute");

// Importa las rutas de autenticación
const authRouter = require("./routes/authRoute");

// Importa la conexión a la base de datos
const db = require("./config/conectionDB");

// Importa el servicio de envío de correos electrónicos
const { sendEmail } = require("./services/emailService");

const htmlRegistro = `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Registro exitoso</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 0 15px rgba(0,0,0,.15);">

<div style="background:#f97316;padding:30px;text-align:center;">
<h1 style="margin:0;color:white;">
Registro Exitoso
</h1>
</div>

<div style="padding:35px;">

<h2 style="color:#f97316;">
Hola Jean Carlos
</h2>

<p style="color:#444;">
Tu registro en la plataforma <strong>OVIADSO</strong> se realizó correctamente.
</p>

<p style="color:#444;">
Ahora puedes acceder al sistema utilizando tus credenciales y disfrutar de todas las funcionalidades disponibles.
</p>

<div style="
background:#fff7ed;
border-left:5px solid #f97316;
padding:15px;
margin-top:20px;
">
Tu cuenta ha sido creada exitosamente.
</div>

<p style="margin-top:25px;">
<strong>Fecha:</strong> ${new Date().toLocaleDateString()}
</p>

</div>

<div style="background:#f97316;color:white;text-align:center;padding:18px;">
Gracias por confiar en OVIADSO.
</div>

</div>

</body>
</html>
`;

const testEmail = async () => {
  try {
   await sendEmail(
    "jeancarlostiqueloaiza148@gmail.com",
    "Registro exitoso",
    "Registro exitoso",
     htmlRegistro
   );

    console.log(" Correo enviado correctamente");
  } catch (error) {
    console.error(" Error al enviar el correo");
    console.error(error);
  }
};

// Crea la aplicación Express
const app = express();

// Obtiene el puerto desde el .env o usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

app.use(cors());

// Activa las protecciones de seguridad de Helmet
app.use(helmet());

// Registra las peticiones HTTP en consola
app.use(morgan("dev"));

// Publica la documentación Swagger en /api/docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registra las rutas de usuarios
app.use("/api/user", userRoute);

// Registra las rutas de mortalidad
app.use("/api/mortality", mortalityRoute);

// Registra las rutas de monta
app.use("/api/mounting", mountingRoute);

// Registra las rutas de partos
app.use("/api/delivery", deliveryRoute);

// Registra las rutas de peso
app.use("/api/weight", weightRoute);

// Registra las rutas de salud
app.use("/api/health", healthRoute);

// Registra las rutas de ovinos
app.use("/api/ovine", ovineRoute);

// Registra las rutas de alimentación
app.use("/api/feeding", feedingRoute);

// Registra las rutas de nacimientos
app.use("/api/birth", birthRoute);

// Registra las rutas de responsables
app.use("/api/responsible", responsiblesRoute);

// Registra las rutas de autenticación
app.use("/api/auth", authRouter);

// Ruta principal del servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Middleware para capturar rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
    route: req.originalUrl,
    method: req.method,
  });
});

// Función para iniciar la aplicación
const init = async () => {
  try {
    // Verifica la conexión con la base de datos
    await db.authenticate();

    console.log("Conexion a DB exitosa");

    // Inicia el servidor
    app.listen(PORT, () => {
      console.log("App corriendo en el puerto " + PORT);

      console.log("Swagger en http://localhost:" + PORT + "/api/docs");
    });
  } catch (error) {
    // Muestra errores de conexión o arranque
    console.error(error);
  }
  await testEmail();
};

// Ejecuta la función de inicio
init();
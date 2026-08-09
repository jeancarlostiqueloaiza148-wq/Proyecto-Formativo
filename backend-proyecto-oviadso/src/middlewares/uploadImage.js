const multer = require("multer"); 
const path = require("path");

// Configuración del almacenamiento 
   const storage = multer.diskStorage({

    destination: function (req, file, cb) { 
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);

        const fileName = 
        Date.now() + "-" + file.fieldname + extension;
        cb(null, fileName);
    }
});

// Validar que el archivo sea una imagen
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
        } else {
        cb(new Error("Solo se permiten archivos de imagen"), false);
    }
};

// Configuración de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = {
    upload
};
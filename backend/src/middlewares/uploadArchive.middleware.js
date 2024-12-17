import multer from "multer";
import path from "path";
import fs from "fs";

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    // Determina la carpeta de destino según el tipo de archivo
    if (file.mimetype.startsWith('image/')) {
      uploadPath = "./src/upload/images/"; // Imágenes van a la carpeta de imágenes
    } else if (file.mimetype === "application/pdf") {
      uploadPath = "./src/upload/"; // PDFs van a la carpeta principal de uploads
    } else {
      return cb(new Error("Tipo de archivo no soportado"), null);
    }

    // Crear el directorio si no existe
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único para evitar sobrescrituras
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro para permitir solo PDFs e imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype.startsWith('image/')) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("Solo se permiten archivos PDF e imágenes"), false); // Rechaza el archivo
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Aumenta el límite a 10 MB
  },
  fileFilter: fileFilter
});

// Middleware para manejar errores de tamaño de archivo
const handleFileSizeLimit = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ status: "Client error", message: "Error en la subida de imagen: File too large", details: {} });
    }
    return res.status(400).json({ status: "Client error", message: `Error en la subida de imagen: ${err.message}`, details: {} });
  } else if (err) {
    return res.status(400).json({ status: "Client error", message: `Error desconocido en la subida de imagen: ${err.message}`, details: {} });
  }
  next();
};

export { upload, handleFileSizeLimit };
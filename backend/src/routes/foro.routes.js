import { Router } from "express";
import {
    createForo,
    getForos,
    getForo,
    updateForo,
    deleteForo
} from "../controllers/foro.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";
import { upload, handleFileSizeLimit } from "../middlewares/uploadArchive.middleware.js";

const router = Router();

// Aplicar autenticación JWT a todas las rutas
router.use(authenticateJWT);

// Definición de rutas para foros
router
    .post("/", verifyRole(["profesor","admin"]), upload.array('archivos'), handleFileSizeLimit, createForo)
    .get("/all", verifyRole(["profesor", "Alumno","admin","administrador"]), getForos)
    .get("/:id", verifyRole(["profesor", "Alumno","admin"]), getForo)
    .patch("/:id", verifyRole(["profesor","admin","Encargado"]), upload.array('archivos'), handleFileSizeLimit, updateForo)
    .delete("/:id", verifyRole(["profesor","admin"]), deleteForo)

export default router;
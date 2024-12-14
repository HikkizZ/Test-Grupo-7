
import { Router } from "express";
import { getArchivos,subidaArchivo } from "../controllers/archivo.controller.js";
import { handleFileSizeLimit , upload } from "../middlewares/uploadArchive.middleware.js";

const router = Router();

router
 .post("/", handleFileSizeLimit, upload.single("archivo"), subidaArchivo)
 .get("/", getArchivos)
export default router;
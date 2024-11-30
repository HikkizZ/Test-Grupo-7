import express from "express";
import { createForo, getForos, getForo, updateForo, deleteForo } from "../controllers/foro.controller.js";

const router = express.Router();

// Ruta para crear un nuevo anuncio
router.post("/foro", createForo);

// Ruta para obtener todos los anuncios
router.get("/foro", getForos);

// Ruta para obtener un anuncio por su ID
router.get("/foro/:id", getForo);

// Ruta para actualizar un anuncio por su ID
router.put("/foro/:id", updateForo);

// Ruta para eliminar un anuncio por su ID
router.delete("/foro/:id", deleteForo);

export default router;

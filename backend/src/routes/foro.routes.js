import express from "express";
import { createForo, getForos, getForo, updateForo, deleteForo } from "../controllers/foro.controller.js";

const router = express.Router();

// Ruta para crear un nuevo anuncio
router.post("/", createForo);

// Ruta para obtener todos los anuncios
router.get("/all", getForos);

// Ruta para obtener un anuncio por su ID
router.get("/:id", getForo);

// Ruta para actualizar un anuncio por su ID
router.put("/:id", updateForo);

// Ruta para eliminar un anuncio por su ID
router.delete("/:id", deleteForo);

export default router;

// ======================= IMPORTS =========================================

import express from "express";
import { addToWatchListController } from "../controllers/watchList/watchListController.js";

// ======================= EXPRESS ROUTER ==================================

/**
 * Importamos Express Router para definir rutas de watchlist.
 * @ROUTER | Express Router
 */

const router = express.Router();

// ======================= WATCHLIST ROUTES ================================

/**
 * Rutas de watchlist.
 * Este archivo define endpoints para gestionar peliculas
 * dentro de la lista personal del usuario.
 *
 * @WATCHLIST | POST /api/watchlist
 *
 */
// Agrega una pelicula a la watchlist del usuario.
router.post("/", addToWatchListController);

export default router;

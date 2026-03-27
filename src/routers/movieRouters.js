// ======================= IMPORTS =========================================

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addMovieController } from "../controllers/movie/addMovieController.js";
import { getMoviesController } from "../controllers/movie/getMoviesController.js";
import { removeMovieController } from "../controllers/movie/removeMovieController.js";
import { updateMovieController } from "../controllers/movie/updateMovieController.js";
import { validateRequest } from "../validations/validateRequest.js";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../validations/movieValidation.js";

const router = express.Router();

// ======================= MOVIE ROUTES ====================================

/**
 * - Define las rutas de peliculas.
 * - Deja `GET` publico para consultar
 * - Protege `POST`, `PUT` y `DELETE`
 * - Valida POST y PUT con Zod
 * - Conecta controllers reales de movie
 *
 * Este archivo conecta el modulo de peliculas
 * con middlewares, validaciones y controllers.
 *
 * @ROUTES | /movies
 *
 */

// Devuelve la lista publica de peliculas.
router.get("/", getMoviesController);

// A partir de aqui las rutas de escritura de movies quedan protegidas.
router.use(authMiddleware);

// Crea una nueva pelicula usando el usuario autenticado como creador.
router.post("/", validateRequest(createMovieSchema), addMovieController);

// Elimina una pelicula concreta por su id.
router.delete("/:id", removeMovieController);

// Actualiza una pelicula concreta por su id.
router.put("/:id", validateRequest(updateMovieSchema), updateMovieController);

export default router;

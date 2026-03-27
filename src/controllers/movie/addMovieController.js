// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= MOVIE | ADD CONTROLLER ==========================

/**
 * - Crea una pelicula nueva.
 * - Usa `req.user.id` como creador
 * - Requiere middleware de autenticacion
 *
 * Este archivo crea una pelicula en Prisma
 * usando el usuario autenticado como `createdBy`.
 *
 * @MOVIE | POST /movies
 *
 */

const addMovieController = async (req, res) => {
  try {
    const { title, overview, description, releaseDate, genres, runtime, posterUrl } =
      req.body;

    // El usuario ya debe venir autenticado desde el middleware.
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Usuario no autenticado",
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        description,
        releaseDate,
        genres,
        runtime,
        posterUrl,
        createdBy: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Movie creada correctamente",
      data: {
        movie,
      },
    });
  } catch (error) {
    console.error("Error add movie:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { addMovieController };

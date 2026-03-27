// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= MOVIE | UPDATE CONTROLLER =======================

/**
 * - Actualiza una pelicula existente.
 * - Solo el creador puede editarla
 * - Requiere middleware de autenticacion
 *
 * Este archivo comprueba que la pelicula exista,
 * que pertenezca al usuario autenticado
 * y luego actualiza sus campos editables.
 *
 * @MOVIE | PUT /movies/:id
 *
 */

const updateMovieController = async (req, res) => {
  try {
    const { title, overview, description, releaseDate, genres, runtime, posterUrl } =
      req.body;

    if (!req.user?.id) {
      return res.status(401).json({
        error: "Usuario no autenticado",
      });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
    });

    if (!movie) {
      return res.status(404).json({
        error: "Movie no encontrada",
      });
    }

    if (movie.createdBy !== req.user.id) {
      return res.status(403).json({
        error: "No autorizado para actualizar esta movie",
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (overview !== undefined) updateData.overview = overview;
    if (description !== undefined) updateData.description = description;
    if (releaseDate !== undefined) updateData.releaseDate = releaseDate;
    if (genres !== undefined) updateData.genres = genres;
    if (runtime !== undefined) updateData.runtime = runtime;
    if (posterUrl !== undefined) updateData.posterUrl = posterUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "No hay campos para actualizar",
      });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: req.params.id },
      data: updateData,
    });

    return res.status(200).json({
      message: "Movie actualizada correctamente",
      data: {
        movie: updatedMovie,
      },
    });
  } catch (error) {
    console.error("Error update movie:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { updateMovieController };

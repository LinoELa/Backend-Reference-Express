// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= MOVIE | REMOVE CONTROLLER =======================

/**
 * - Elimina una pelicula existente.
 * - Solo el creador puede borrarla
 * - Limpia antes sus referencias en watchlist
 * - Requiere middleware de autenticacion
 *
 * Este archivo comprueba que la pelicula exista,
 * que pertenezca al usuario autenticado
 * y luego la elimina de la base de datos.
 *
 * @MOVIE | DELETE /movies/:id
 *
 */

const removeMovieController = async (req, res) => {
  try {
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
        error: "No autorizado para borrar esta movie",
      });
    }

    // Borramos antes los items de watchlist que apuntan a esta movie
    // para evitar conflictos de claves foraneas.
    await prisma.$transaction([
      prisma.watchlistItem.deleteMany({
        where: { movieId: req.params.id },
      }),
      prisma.movie.delete({
        where: { id: req.params.id },
      }),
    ]);

    return res.status(200).json({
      message: "Movie eliminada correctamente",
    });
  } catch (error) {
    console.error("Error remove movie:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { removeMovieController };

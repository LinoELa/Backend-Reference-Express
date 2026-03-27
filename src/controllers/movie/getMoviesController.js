// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= MOVIE | GET CONTROLLER ==========================

/**
 * - Lista las peliculas del sistema.
 * - Devuelve tambien datos basicos del creador
 * - No requiere autenticacion para consultar
 *
 * Este archivo obtiene las peliculas desde Prisma
 * y devuelve la lista ordenada por fecha de creacion.
 *
 * @MOVIE | GET /movies
 *
 */

const getMoviesController = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Movies obtenidas correctamente",
      data: {
        movies,
      },
    });
  } catch (error) {
    console.error("Error get movies:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { getMoviesController };

// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= WATCHLIST | ADD CONTROLLER ======================

/**
 * - Agrega una pelicula a la watchlist.
 * - Valida que la pelicula exista
 * - Evita duplicados para el mismo usuario
 * - Requiere middleware de autenticacion
 *
 * Este archivo valida la pelicula y evita duplicados
 * antes de crear un item en `watchlistItem`.
 *
 * @WATCHLIST | POST /watchlist
 *
 */

const addToWatchListController = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    // El usuario ya debe venir autenticado desde el middleware.
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Usuario no autenticado",
      });
    }

    // Validamos que llegue la pelicula a agregar.
    if (!movieId) {
      return res.status(400).json({
        error: "movieId es obligatorio",
      });
    }

    // Comprobamos que la pelicula exista antes de continuar.
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(400).json({
        error: "Movie no encontrado",
      });
    }

    // Evitamos duplicar la misma pelicula para el mismo usuario.
    const existingInWatchList = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId,
        },
      },
    });

    if (existingInWatchList) {
      return res.status(409).json({
        message: "Movie ya agregado a watchlist",
      });
    }

    // Creamos el item asociando la pelicula al usuario autenticado.
    // El `userId` ya no viene del body: sale de `req.user`.
    const watchListItem = await prisma.watchlistItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    // Respondemos con el item ya creado para que el frontend tenga el resultado final.
    return res.status(201).json({
      message: "Movie agregado a watchlist",
      data: {
        watchListItem,
      },
    });
  } catch (error) {
    // Capturamos errores inesperados de Prisma o de validacion.
    console.error("Error add movie to watchlist:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { addToWatchListController };

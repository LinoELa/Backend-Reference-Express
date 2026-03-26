// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= WATCHLIST CONTROLLER ============================

/**
 * Controller para agregar peliculas a la watchlist.
 * Este archivo valida usuario y pelicula antes de crear
 * un item dentro de la tabla `watchlistItem`.
 *
 * @WATCHLIST | POST /api/watchlist
 *
 */

const addToWatchListController = async (req, res) => {
  try {
    const { movieId, status, rating, notes, userId } = req.body;

    // Validamos que lleguen los IDs minimos para crear el item.
    if (!movieId || !userId) {
      return res.status(400).json({
        error: "movieId y userId son obligatorios",
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

    // Tambien comprobamos que el usuario exista.
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({
        error: "Usuario no encontrado",
      });
    }

    // Evitamos duplicar la misma pelicula para el mismo usuario.
    const existingInWatchList = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });

    if (existingInWatchList) {
      return res.status(409).json({
        message: "Movie ya agregado a watchlist",
      });
    }

    // Creamos el item con el estado y notas opcionales.
    const watchListItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      message: "Movie agregado a watchlist",
      data: {
        watchListItem,
      },
    });
  } catch (error) {
    // Capturamos errores inesperados del proceso.
    console.error("Error add movie to watchlist:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { addToWatchListController };

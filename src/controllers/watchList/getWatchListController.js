// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= WATCHLIST | GET CONTROLLER ======================

/**
 * - Lista la watchlist del usuario autenticado.
 * - Devuelve tambien informacion de la pelicula
 * - Requiere middleware de autenticacion
 *
 * Este archivo obtiene todos los items de watchlist
 * del usuario autenticado junto con su informacion relacionada.
 *
 * @WATCHLIST | GET /watchlist
 *
 */

const getWatchListController = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Usuario no autenticado",
      });
    }

    const watchListItems = await prisma.watchlistItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        movie: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Watchlist obtenida correctamente",
      data: {
        watchListItems,
      },
    });
  } catch (error) {
    console.error("Error get watchlist:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { getWatchListController };

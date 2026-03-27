// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= WATCHLIST | REMOVE CONTROLLER ===================

/**
 * - Elimina un item de la watchlist.
 * - Valida que el item exista
 * - Asegura que solo el duenio pueda borrarlo
 * - Requiere middleware de autenticacion
 *
 * Este archivo comprueba que el item exista
 * y que pertenezca al usuario autenticado.
 *
 * @WATCHLIST | DELETE /watchlist/:id
 *
 */

const removeFromWatchListController = async (req, res) => {
  try {
    // El usuario ya debe venir autenticado desde el middleware.
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Usuario no autenticado",
      });
    }

    // Buscamos el item concreto de watchlist por su id.
    const watchListItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchListItem) {
      return res.status(404).json({
        error: "Watchlist item no encontrado",
      });
    }

    // Solo el usuario dueño del item puede eliminarlo.
    if (watchListItem.userId !== req.user.id) {
      return res.status(403).json({
        error: "No autorizado para borrar este item",
      });
    }

    // Si el item existe y pertenece al usuario autenticado, lo borramos.
    await prisma.watchlistItem.delete({
      where: { id: req.params.id },
    });

    // Si todo salio bien, respondemos confirmando la eliminacion.
    return res.status(200).json({
      status: "success",
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    // Capturamos errores inesperados al buscar o borrar el item.
    console.error("Error remove movie from watchlist:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { removeFromWatchListController };

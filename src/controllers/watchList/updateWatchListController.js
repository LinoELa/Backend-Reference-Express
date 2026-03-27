// ======================= IMPORTS =========================================

import { prisma } from "../../config/db.js";

// ======================= WATCHLIST | UPDATE CONTROLLER ===================

/**
 * - Actualiza un item de la watchlist.
 * - Actualiza `status`, `rating` o `notes`
 * - Asegura que solo el duenio pueda editarlo
 * - Requiere middleware de autenticacion
 *
 * Este archivo comprueba que el item exista,
 * que pertenezca al usuario autenticado
 * y luego actualiza sus campos editables.
 *
 * @WATCHLIST | PUT /watchlist/:id
 *
 */

const updateWatchListController = async (req, res) => {
  try {
    const { status, rating, notes } = req.body;

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

    // Si el item no existe, detenemos el proceso.
    if (!watchListItem) {
      return res.status(404).json({
        error: "Watchlist item no encontrado",
      });
    }

    // Solo el usuario dueno del item puede modificarlo.
    if (watchListItem.userId !== req.user.id) {
      return res.status(403).json({
        error: "No autorizado para actualizar este item",
      });
    }

    // Construimos el objeto de actualizacion solo con los campos
    // que el usuario realmente envio en la peticion.
    const updateData = {};
    if (status !== undefined) updateData.status = String(status).toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Si no llega ningun campo editable, frenamos la actualizacion.
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "No hay campos para actualizar",
      });
    }

    // Actualizamos el item y guardamos la version final en una variable
    // para devolver exactamente el resultado que quedo en base de datos.
    const updatedWatchListItem = await prisma.watchlistItem.update({
      where: { id: req.params.id },
      data: updateData,
    });

    // Respondemos con el item ya actualizado para que el frontend
    // tenga el estado final del registro despues del cambio.
    return res.status(200).json({
      message: "Watchlist item actualizado correctamente",
      data: {
        watchListItem: updatedWatchListItem,
      },
    });
  } catch (error) {
    // Capturamos errores inesperados de Prisma o de validacion.
    console.error("Error update watchlist item:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { updateWatchListController };

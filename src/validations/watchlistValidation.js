import { z } from "zod";

// ======================= WATCHLIST VALIDATIONS ===========================

/**
 * - Define schemas de validacion para watchlist.
 * - Valida el body de crear y actualizar
 * - Usa Zod para normalizar datos
 *
 * Este archivo centraliza las reglas del modulo de watchlist
 * para no repetir validaciones dentro de los controllers.
 *
 * @VALIDATION | watchlist
 *
 */

const addToWatchListSchema = z.object({
  movieId: z.string().uuid("movieId debe ser un UUID valido"),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message:
          "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
  notes: z.string().optional(),
});

const updateWatchListSchema = z
  .object({
    status: z
      .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        error: () => ({
          message:
            "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
        }),
      })
      .optional(),
    rating: z.coerce
      .number()
      .int("Rating must be an integer")
      .min(1, "Rating must be between 1 and 10")
      .max(10, "Rating must be between 1 and 10")
      .optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) =>
      data.status !== undefined ||
      data.rating !== undefined ||
      data.notes !== undefined,
    {
      message: "Debes enviar al menos un campo para actualizar",
    }
  );

export { addToWatchListSchema, updateWatchListSchema };

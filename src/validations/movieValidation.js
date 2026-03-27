import { z } from "zod";

// ======================= MOVIE VALIDATIONS ===============================

/**
 * - Define schemas de validacion para movies.
 * - Valida crear y actualizar peliculas
 * - Usa Zod para normalizar tipos
 * - Deja `createdBy` fuera del body
 *
 * Este archivo prepara la validacion del modulo de peliculas
 * y deja que el controller tome `createdBy` desde `req.user.id`.
 *
 * @VALIDATION | movie
 *
 */

const movieStatusFields = {
  title: z.string().trim().min(1, "Title is required").optional(),
  overview: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required").optional(),
  releaseDate: z.coerce.date({
    error: () => ({
      message: "ReleaseDate must be a valid date",
    }),
  }).optional(),
  genres: z.array(z.string().trim().min(1)).optional(),
  runtime: z.coerce
    .number()
    .int("Runtime must be an integer")
    .positive("Runtime must be greater than 0")
    .optional(),
  posterUrl: z.string().url("PosterUrl must be a valid URL").optional(),
};

const createMovieSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  overview: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required"),
  releaseDate: z.coerce.date({
    error: () => ({
      message: "ReleaseDate must be a valid date",
    }),
  }),
  genres: z.array(z.string().trim().min(1)).default([]),
  runtime: z.coerce
    .number()
    .int("Runtime must be an integer")
    .positive("Runtime must be greater than 0")
    .optional(),
  posterUrl: z.string().url("PosterUrl must be a valid URL").optional(),
});

const updateMovieSchema = z
  .object(movieStatusFields)
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "Debes enviar al menos un campo para actualizar",
  });

export { createMovieSchema, updateMovieSchema };

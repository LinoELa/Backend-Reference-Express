import { z } from "zod";

// ======================= AUTH VALIDATIONS ================================

/**
 * - Define schemas de validacion para auth.
 * - Valida register y login
 * - Usa Zod para limpiar el body antes del controller
 *
 * Este archivo centraliza las reglas del modulo de autenticacion
 * para que las rutas lleguen mas limpias al controller.
 *
 * @VALIDATION | auth
 *
 */

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Email must be a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email must be a valid email"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export { registerSchema, loginSchema };

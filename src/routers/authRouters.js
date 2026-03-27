// ======================= IMPORTS =========================================

import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { logoutController } from "../controllers/auth/logoutController.js";
import { validateRequest } from "../validations/validateRequest.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

// ======================= EXPRESS ROUTER ==================================

/**
 * - Define las rutas de autenticacion.
 * - Conecta register, login y logout
 * - Delega la logica a sus controllers
 * - Valida register y login antes del controller
 *
 * Importamos Express Router para definir rutas de autenticacion.
 * @ROUTER | Express Router
 */

const router = express.Router();

// ======================= AUTHENTICATION ROUTES ============================

/**
 * Rutas de autenticacion.
 * Este archivo define los endpoints publicos para registrar usuarios
 * e iniciar sesion dentro del modulo de auth.
 *
 * @REGISTER | POST /auth/register
 * @LOGIN | POST /auth/login
 * @LOGOUT | POST /auth/logout
 *
 */
// Registro de usuarios nuevos.
router.post("/register", validateRequest(registerSchema), registerController);

// Login y generacion del token JWT.
router.post("/login", validateRequest(loginSchema), loginController);

// Logout y limpieza de la cookie del token.
router.post("/logout", logoutController);

export default router;

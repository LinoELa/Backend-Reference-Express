// ======================= IMPORTS =========================================

import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { logoutController } from "../controllers/auth/logoutController.js";

// ======================= EXPRESS ROUTER ==================================

/**
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
 * @REGISTER | POST /api/auth/register
 * @LOGIN | POST /api/auth/login
 * @LOGOUT | POST /api/auth/logout
 *
 */
// Registro de usuarios nuevos.
router.post("/register", registerController);

// Login y generacion del token JWT.
router.post("/login", loginController);

// Logout y limpieza de la cookie del token.
router.post("/logout", logoutController);

export default router;

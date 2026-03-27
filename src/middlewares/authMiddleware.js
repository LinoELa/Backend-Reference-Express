// ======================= IMPORTS =========================================

import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// ======================= AUTH MIDDLEWARE ================================

/**
 * - Protege rutas privadas.
 * - Lee el token JWT
 * - Valida el token
 * - Busca al usuario autenticado
 * - Guarda el usuario en `req.user`
 *
 * Este archivo lee el token JWT, lo valida
 * y busca al usuario autenticado en la base de datos.
 *
 * Si todo sale bien, guarda ese usuario en `req.user`
 * para que el siguiente controller pueda usarlo.
 *
 * @MIDDLEWARE | auth
 *
 */

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Intentamos leer el token desde el header Authorization.
  // Esperamos un formato como: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Si no viene en el header, intentamos leerlo desde la cookie `token`.
  else if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.cookie?.token) {
    token = req.cookie.token;
  }

  // 3. Si no hay token, la ruta queda bloqueada.
  if (!token) {
    return res.status(401).json({
      error: "No token provided, authorization denied.",
    });
  }

  try {
    // 4. Verificamos que el token sea valido usando JWT_SECRET.
    // Si el token fue modificado o esta vencido, jwt.verify lanzara error.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Buscamos al usuario real en la base de datos con el `id`
    // guardado dentro del payload del token.
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    // 6. Si el token es valido pero el usuario ya no existe,
    // tambien negamos el acceso.
    if (!user) {
      return res.status(401).json({
        error: "User not found, authorization denied.",
      });
    }

    // 7. Guardamos el usuario autenticado dentro de `req.user`
    // para que los controllers siguientes no tengan que buscarlo otra vez.
    req.user = user;

    // 8. Si todo esta correcto, continuamos con la siguiente parte
    // del flujo: otro middleware o el controller final.
    next();
  } catch (error) {
    // Si el token es invalido, esta vencido o hay cualquier fallo
    // al verificarlo, respondemos con 401 Unauthorized.
    console.error("Error in auth middleware:", error);
    return res.status(401).json({
      error: "Invalid token, authorization denied.",
    });
  }
};

export { authMiddleware };

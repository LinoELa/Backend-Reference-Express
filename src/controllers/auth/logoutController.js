// ======================= IMPORTS =========================================

// ======================= AUTH | LOGOUT CONTROLLER ========================

/**
 * - Cierra la sesion del usuario.
 * - Limpia la cookie del token
 * - Devuelve una respuesta de salida correcta
 *
 * Este archivo se puede usar para limpiar la cookie del token
 * y cerrar la sesion del usuario en el cliente.
 *
 * @LOGOUT | POST /auth/logout
 *
 */

const logoutController = async (req, res) => {
  try {
    // Limpiamos la cookie donde guardamos el token.
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout exitoso",
    });
  } catch (error) {
    // Capturamos cualquier fallo al limpiar la cookie o responder.
    console.error("Error logout user:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { logoutController };

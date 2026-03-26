// ======================= IMPORTS =========================================

import bcrypt from "bcryptjs";
import { prisma } from "../../config/db.js";
import { generateToken } from "../../utils/token/generateToken.js";

// ======================= AUTH | LOGIN CONTROLLER =========================

/**
 * Controller de login.
 * Este archivo valida email y password, busca el usuario,
 * compara el hash y genera un JWT cuando el login es correcto.
 *
 * @LOGIN | POST /api/auth/login
 *
 */

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validamos que el usuario envie email y password.
    if (!email || !password) {
      return res.status(400).json({
        message: "email y password son obligatorios",
      });
    }

    // Buscamos al usuario por email.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales invalidas",
      });
    }

    // Comparamos la password recibida con el hash guardado.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Credenciales invalidas",
      });
    }

    // Si las credenciales son validas, generamos el JWT.
    const token = generateToken(user.id, res);

    return res.status(200).json({
      message: "Login exitoso",
      data: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // Capturamos errores inesperados del proceso de login.
    console.error("Error login user:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { loginController };

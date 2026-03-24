// ======================= AUTENTIFICACION ================================

import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

/**
 * Registrar un nuevo usuario.
 * Recibe name, email y password desde req.body.
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email y password son obligatorios",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "El usuario ya existe",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error register user:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { register };

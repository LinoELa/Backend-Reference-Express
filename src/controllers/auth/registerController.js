// ======================= IMPORTS =========================================

import bcrypt from "bcryptjs";
import { prisma } from "../../config/db.js";

// ======================= AUTH | REGISTER CONTROLLER ======================

/**
 * - Registra un usuario nuevo.
 * - Valida campos obligatorios
 * - Evita emails duplicados
 * - Hashea la password antes de guardar
 *
 * Este archivo recibe los datos del usuario, valida duplicados,
 * aplica hashing con bcryptjs y crea el usuario en la base de datos.
 *
 * @REGISTER | POST /auth/register
 *
 */

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validamos que lleguen los campos minimos del registro.
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email y password son obligatorios",
      });
    }

    // Comprobamos si ya existe un usuario con ese email.
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "El usuario ya existe",
      });
    }

    // La password nunca se guarda en texto plano.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prisma genera el UUID del usuario automaticamente.
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
    // Si algo falla en base de datos o hashing, devolvemos error controlado.
    console.error("Error register user:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { registerController };

// ======================= IMPORTS =========================================

import bcrypt from "bcryptjs";
import { prisma } from "../../src/config/db.js";

/**
 * Seed file para usuarios.
 * Este archivo crea usuarios base para desarrollo
 * y evita duplicados usando `upsert`.
 *
 * @SEED | node prisma/seed/userSeed.js
 *
 */

// ======================= SEED DATA =======================================

const userSeeds = [
  {
    name: "Root",
    email: "root@test.com",
    password: "12345",
  },
  {
    name: "Admin",
    email: "admin@test.com",
    password: "12345",
  },
  {
    name: "Lucia",
    email: "lucia@test.com",
    password: "12345",
  },
  {
    name: "Mateo",
    email: "mateo@test.com",
    password: "12345",
  },
  {
    name: "Sofia",
    email: "sofia@test.com",
    password: "12345",
  },
];

// ======================= RUN SEED ========================================

const runSeed = async () => {
  try {
    console.log("Starting user seed...");

    for (const user of userSeeds) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const savedUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          password: hashedPassword,
        },
        create: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });

      console.log(`User ready: ${savedUser.email} | id: ${savedUser.id}`);
    }

    console.log(`Users created or updated: ${userSeeds.length}`);
    console.log("User seed completed successfully.");
  } catch (error) {
    console.error("Error running user seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();

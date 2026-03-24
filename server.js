import express from "express";
import dotenv from "dotenv";
import movieRouters from "./src/routers/movieRouters.js";
import authRouters from "./src/routers/authRouters.js";
import { connectDB, disconnectDB } from "./src/config/db.js";

// ======================= ENV CONFIG ==========================================

dotenv.config();

// ======================= APP CONFIG ==========================================

const app = express();
const port = process.env.PORT || 3000;

// ======================= BODY PARSING MIDDLEWARES ============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================= API ROUTES ==========================================

app.use("/movies", movieRouters);
app.use("/auth", authRouters);

// ======================= START SERVER ========================================

const server = app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});

// ======================= GLOBAL ERROR HANDLERS ===============================

// Captura promesas rechazadas que no tuvieron catch.
process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Captura errores inesperados fuera de promesas.
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Permite cerrar el servidor y Prisma de forma limpia.
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

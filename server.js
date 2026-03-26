// ======================= IMPORTS =========================================

import express from "express";
import dotenv from "dotenv";
import movieRouters from "./src/routers/movieRouters.js";
import authRouters from "./src/routers/authRouters.js";
import watchListRouters from "./src/routers/watchListRouters.js";

import { connectDB, disconnectDB } from "./src/config/db.js";

// ======================= ENV CONFIG ======================================

/**
 * Punto de entrada principal del servidor.
 * Este archivo configura Express, registra middlewares,
 * conecta rutas y arranca la aplicacion.
 *
 * @SERVER | node server.js
 *
 */

dotenv.config();

// ======================= APP CONFIG ======================================

const app = express();
const port = process.env.PORT || 3000;

// ======================= BODY PARSING MIDDLEWARES ========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================= API ROUTES ======================================

app.use("/movies", movieRouters);
app.use("/auth", authRouters);

app.use("/watchlist", watchListRouters);

// ======================= START SERVER ====================================

const server = app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});

// ======================= GLOBAL ERROR HANDLERS ===========================

process.on("unhandledRejection", async (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

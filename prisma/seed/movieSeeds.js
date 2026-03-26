// ======================= IMPORTS =========================================

import { prisma } from "../../src/config/db.js";

/**
 * Seed file para peliculas.
 * Este archivo inserta peliculas de ejemplo usando el UUID
 * de un usuario que ya existe en la base de datos.
 *
 * @SEED | node prisma/seed/movieSeeds.js
 *
 */

// ======================= SEED CONFIG =====================================

/**
 * Este UUID debe pertenecer a un usuario real.
 * Lo puedes sacar desde Postman, Prisma Studio o la respuesta del login/register.
 */
const userId = "ce304397-4b03-4572-b45f-4c7220e61cbc";

// ======================= SEED DATA =======================================

const movieSeeds = [
  {
    title: "Silent Shadow",
    overview: "Una historia intensa sobre decisiones imposibles.",
    description:
      "Un protagonista atrapado entre secretos, peligro y decisiones morales.",
    releaseDate: new Date("2022-05-14"),
    genres: ["Drama", "Thriller"],
    runtime: 118,
    posterUrl: "https://picsum.photos/seed/movie-1/400/600",
    createdBy: userId,
  },
  {
    title: "Golden Empire",
    overview: "Una aventura futurista llena de tension.",
    description:
      "Una mision arriesgada cambia la vida del protagonista para siempre.",
    releaseDate: new Date("2021-11-03"),
    genres: ["Sci-Fi", "Adventure"],
    runtime: 126,
    posterUrl: "https://picsum.photos/seed/movie-2/400/600",
    createdBy: userId,
  },
  {
    title: "Burning Memory",
    overview: "Un pasado olvidado vuelve para cambiarlo todo.",
    description:
      "Una trama de misterio y drama donde cada decision tiene consecuencias.",
    releaseDate: new Date("2020-09-21"),
    genres: ["Mystery", "Drama"],
    runtime: 110,
    posterUrl: "https://picsum.photos/seed/movie-3/400/600",
    createdBy: userId,
  },
  {
    title: "Frozen Signal",
    overview: "Una senal extrana desata una carrera contra el tiempo.",
    description:
      "Un grupo de personajes intenta descifrar un mensaje que puede cambiar el futuro.",
    releaseDate: new Date("2023-02-10"),
    genres: ["Sci-Fi", "Thriller"],
    runtime: 121,
    posterUrl: "https://picsum.photos/seed/movie-4/400/600",
    createdBy: userId,
  },
  {
    title: "Crimson Legacy",
    overview: "El legado de una familia desata un conflicto inesperado.",
    description:
      "Entre secretos, poder y traiciones, los protagonistas luchan por sobrevivir.",
    releaseDate: new Date("2019-07-30"),
    genres: ["Action", "Fantasy"],
    runtime: 132,
    posterUrl: "https://picsum.photos/seed/movie-5/400/600",
    createdBy: userId,
  },
];

// ======================= RUN SEED ========================================

const runSeed = async () => {
  try {
    console.log("Starting movie seed...");

    // Antes de crear peliculas, comprobamos que el UUID pertenezca a un usuario real.
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error(`No existe un usuario con el id ${userId}`);
    }

    for (const movie of movieSeeds) {
      await prisma.movie.create({
        data: movie,
      });

      console.log(`Movie created: ${movie.title}`);
    }

    console.log(`Movies created: ${movieSeeds.length}`);
    console.log("Movie seed completed successfully.");
  } catch (error) {
    console.error("Error running movie seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();

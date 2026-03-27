# @movie

Esta subcarpeta agrupa los controllers del modulo de peliculas.

Aqui se coloca la logica relacionada con:

- listar peliculas
- crear peliculas
- actualizar peliculas
- eliminar peliculas
- comprobar que la pelicula exista
- asegurar que solo el creador pueda editar o borrar

En este proyecto actual, los controllers principales son:

- `getMoviesController`
- `addMovieController`
- `updateMovieController`
- `removeMovieController`

Los endpoints principales de este modulo son:

- `GET /movies`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`

La idea es separar esta logica del router para que `movieRouters.js` solo conecte rutas, middlewares y validaciones.

# Movie Controllers y GET

## Objetivo de esta parte

En esta fase del proyecto se completa el modulo de `movies` con controllers reales y se agrega `GET` a `watchlist`.

La idea es dejar `movies` con la misma estructura modular que ya tiene `auth` y `watchlist`.

## Que se ha creado

En esta parte se han creado:

- [`@movie.md`](../../src/controllers/movie/@movie.md)
- [`getMoviesController.js`](../../src/controllers/movie/getMoviesController.js)
- [`addMovieController.js`](../../src/controllers/movie/addMovieController.js)
- [`updateMovieController.js`](../../src/controllers/movie/updateMovieController.js)
- [`removeMovieController.js`](../../src/controllers/movie/removeMovieController.js)
- [`getWatchListController.js`](../../src/controllers/watchList/getWatchListController.js)

## Que hace cada controller de `movies`

### `getMoviesController`

- lista todas las peliculas
- devuelve tambien datos basicos del creador
- no requiere autenticacion

### `addMovieController`

- crea una pelicula nueva
- usa `req.user.id` como `createdBy`
- requiere autenticacion

### `updateMovieController`

- comprueba que la pelicula exista
- comprueba que pertenezca al usuario autenticado
- actualiza solo los campos recibidos

### `removeMovieController`

- comprueba que la pelicula exista
- comprueba que pertenezca al usuario autenticado
- borra antes sus referencias en `watchlistItem`
- elimina la pelicula

## Rutas actuales de `movies`

```javascript
router.get("/", getMoviesController);
router.post("/", validateRequest(createMovieSchema), addMovieController);
router.put("/:id", validateRequest(updateMovieSchema), updateMovieController);
router.delete("/:id", removeMovieController);
```

Eso deja los endpoints asi:

```text
GET /movies
POST /movies
PUT /movies/:id
DELETE /movies/:id
```

## Endpoints completos de `watchlist`

Ahora mismo `watchlist` ya queda asi:

```javascript
router.get("/", getWatchListController);
router.post("/", validateRequest(addToWatchListSchema), addToWatchListController);
router.put("/:id", validateRequest(updateWatchListSchema), updateWatchListController);
router.delete("/:id", removeFromWatchListController);
```

Eso permite:

```text
GET /watchlist
POST /watchlist
PUT /watchlist/:id
DELETE /watchlist/:id
```

`GET /watchlist` devuelve los items del usuario autenticado junto con su `movie`.

## Relacion con middleware y validaciones

En este bloque:

- `GET /movies` queda publico
- `POST`, `PUT` y `DELETE` de movies usan `authMiddleware`
- `movieValidation.js` ya no espera `createdBy` en el body
- `GET /watchlist`, `POST /watchlist` y `PUT /watchlist/:id` trabajan con `req.user`

## Idea importante

Ahora `movies` ya sigue la misma linea que el resto del proyecto:

- router
- middleware
- validacion
- controller
- documentacion interna

## Siguiente paso natural

El siguiente punto natural es seguir ampliando el modulo de movies y watchlist con mas consultas, por ejemplo detalle por `id`, filtros o busqueda.



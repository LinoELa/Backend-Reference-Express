# Watchlist, Routes y Controllers

## Objetivo de esta parte

En esta fase del proyecto se ha preparado la parte de `watchlist`.

La idea es permitir que un usuario autenticado pueda listar, agregar, borrar y actualizar peliculas en su lista personal usando rutas propias y controllers separados.

## Que se ha creado

En esta parte se han creado:

- la ruta [`watchListRouters.js`](../../src/routers/watchListRouters.js)
- el controller [`getWatchListController.js`](../../src/controllers/watchList/getWatchListController.js)
- el controller [`addWatchListController.js`](../../src/controllers/watchList/addWatchListController.js)
- el controller [`removeWatchListController.js`](../../src/controllers/watchList/removeWatchListController.js)
- el controller [`updateWatchListController.js`](../../src/controllers/watchList/updateWatchListController.js)
- el middleware [`authMiddleware.js`](../../src/middlewares/authMiddleware.js)
- la carpeta interna [`@watchList.md`](../../src/controllers/watchList/@watchList.md)
- la carpeta interna [`@validations.md`](../../src/validations/@validations.md)

Tambien se conecto la ruta en [`server.js`](../../server.js):

```javascript
app.use("/watchlist", watchListRouters);
```

## Ruta actual

Ahora mismo las rutas disponibles son:

```javascript
router.get("/", getWatchListController);
router.post("/", validateRequest(addToWatchListSchema), addToWatchListController);
router.delete("/:id", removeFromWatchListController);
router.put("/:id", validateRequest(updateWatchListSchema), updateWatchListController);
```

Eso significa que los endpoints actuales son:

```text
GET /watchlist
POST /watchlist
DELETE /watchlist/:id
PUT /watchlist/:id
```

## Que hace cada controller

### `addToWatchListController`

- recibe `movieId`, `status`, `rating` y `notes`
- usa `req.user.id` desde el middleware
- valida que llegue `movieId`
- comprueba que la pelicula exista
- revisa si esa pelicula ya estaba en la watchlist de ese usuario
- si no existe, crea un nuevo item en `watchlistItem`

### `getWatchListController`

- usa `req.user.id` desde el middleware
- lista solo los items del usuario autenticado
- incluye informacion de la pelicula relacionada
- devuelve la watchlist ordenada por fecha de creacion

### `removeFromWatchListController`

- busca el item por `req.params.id`
- comprueba que exista
- comprueba que pertenezca al usuario autenticado
- lo elimina si todo es correcto

### `updateWatchListController`

- busca el item por `req.params.id`
- comprueba que exista
- comprueba que pertenezca al usuario autenticado
- actualiza `status`, `rating` y `notes`
- solo modifica los campos que lleguen en el body

## Validacion con Zod

Antes de entrar en los controllers:

- `POST /watchlist` valida `movieId`, `status`, `rating` y `notes`
- `PUT /watchlist/:id` valida `status`, `rating` y `notes`
- `validateRequest` reemplaza `req.body` por los datos ya validados

## Validaciones importantes

### Si falta `movieId` al agregar

Responde:

```text
400 Bad Request
```

### Si la pelicula no existe

Responde:

```text
400 Bad Request
```

### Si no existe el item al borrar o actualizar

Responde:

```text
404 Not Found
```

### Si el item no pertenece al usuario autenticado

Responde:

```text
403 Forbidden
```

### Si ya estaba en la watchlist al agregar

Responde:

```text
409 Conflict
```

## Relacion con Prisma

La watchlist usa el modelo `watchlistItem` del esquema de Prisma.

Ese modelo relaciona:

- un usuario
- una pelicula

Y ademas guarda:

- `status`
- `rating`
- `notes`

La restriccion:

```prisma
@@unique([userId, movieId])
```

evita que un mismo usuario meta la misma pelicula dos veces.

## Ejemplo de body

```json
{
  "movieId": "b2f94d0d-3d19-4a22-8f8d-61727e43f214",
  "status": "PLANNED",
  "rating": 8,
  "notes": "Quiero verla este fin de semana"
}
```

## Estructura actual relacionada

```text
src/
  controllers/
    watchList/
      @watchList.md
      getWatchListController.js
      addWatchListController.js
      removeWatchListController.js
      updateWatchListController.js
  routers/
    watchListRouters.js
  middlewares/
    authMiddleware.js
  validations/
    @validations.md
    validateRequest.js
    watchlistValidation.js
server.js
```

## Idea importante de esta fase

Ahora mismo `watchlist` ya tiene:

- su propia ruta
- controllers separados para get, add, remove y update
- validacion basica
- validacion con Zod en `POST` y `PUT`
- control de duplicados
- conexion con Prisma
- middleware de autenticacion conectado

## Lo que aun falta

Aunque la ruta ya funciona a nivel base, todavia hay una mejora clave pendiente:

- afinar completamente la integracion middleware + auth segun el flujo final
- decidir si el token vendra por header, cookie o ambos en el frontend

## Siguiente paso natural

El siguiente punto natural ya no es crear el middleware desde cero, porque esa parte base ya existe.

Ahora lo siguiente es pulir el flujo final:

- decidir como se enviara el token desde el frontend
- probar `watchlist` completa con login real
- ampliar rutas como listado personal de watchlist si hace falta



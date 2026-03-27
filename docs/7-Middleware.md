# Middleware

## Objetivo de esta parte

En esta fase del proyecto se prepara la autenticacion de rutas privadas usando middleware.

La idea es que antes de llegar al controller, la peticion pase por una capa intermedia que compruebe si el usuario esta autenticado.

## Que es un middleware

Un middleware es una funcion que se ejecuta entre la peticion del cliente y el controller final.

Sirve para hacer tareas como:

- validar tokens
- bloquear accesos no autorizados
- leer datos del usuario autenticado
- reutilizar logica comun en varias rutas

## Archivo actual

El middleware actual esta en [`authMiddleware.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/middlewares/authMiddleware.js).

## Que hace `authMiddleware`

Ahora mismo `authMiddleware` hace esto:

1. intenta leer el token JWT
2. primero revisa el header `Authorization`
3. si no lo encuentra ahi, intenta leerlo desde la cookie `token`
4. si no hay token, responde `401 Unauthorized`
5. si hay token, lo valida con `JWT_SECRET`
6. saca el `id` del usuario desde el payload
7. busca ese usuario en Prisma
8. si existe, lo guarda en `req.user`
9. si todo esta bien, ejecuta `next()`

En el servidor tambien se registra `cookie-parser`, para que Express pueda leer `req.cookies` cuando el token venga por cookie.

## Por que esto es importante

Sin middleware, cualquier cliente podria intentar mandar un `userId` manualmente.

Con middleware, la idea correcta es:

- el usuario hace login
- recibe un JWT
- manda ese token en la peticion
- el middleware valida el token
- el backend identifica al usuario autenticado
- la ruta ya no depende de un `userId` escrito manualmente

## Relacion con watchlist y movies

En [`watchListRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/watchListRouters.js) ya se esta usando:

```javascript
router.use(authMiddleware);
```

Eso significa que las rutas de `watchlist` pasan primero por el middleware antes de llegar al controller.

En [`movieRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/movieRouters.js) tambien se usa `authMiddleware` para proteger `POST`, `PUT` y `DELETE`, mientras que `GET /movies` queda publico.

## Estructura actual relacionada

```text
src/
  middlewares/
    @middlewares.md
    authMiddleware.js
  routers/
    movieRouters.js
    watchListRouters.js
  controllers/
    movie/
      addMovieController.js
      updateMovieController.js
      removeMovieController.js
    watchList/
      getWatchListController.js
      addWatchListController.js
      removeWatchListController.js
      updateWatchListController.js
```

## Lo que ya esta hecho

En esta fase ya tenemos:

- carpeta `middlewares`
- `authMiddleware.js`
- uso del middleware en `watchListRouters.js`
- uso del middleware en las rutas privadas de `movieRouters.js`
- estructura de `req.user`
- controllers de movie y watchlist preparados para trabajar con `req.user.id`
- documentacion interna de middlewares

## Lo que aun falta mejorar

Aunque ya existe la base del middleware, todavia hay mejoras pendientes:

- dejar claro si el token vendra por header, cookie o ambos
- probar el flujo real desde login hasta watchlist
- ampliar middlewares si aparecen nuevas rutas privadas

## Siguiente paso natural

El siguiente punto es seguir construyendo rutas privadas encima de esta base, usando `req.user` y validaciones antes de llegar al controller.

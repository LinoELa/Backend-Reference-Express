# Validations con Zod

## Objetivo de esta parte

En esta fase del proyecto se prepara una capa de validacion para los bodies antes de llegar al controller.

La idea es evitar que el controller reciba datos incompletos o con formato incorrecto.

## Que se ha creado

En esta parte se han creado o preparado:

- [`validateRequest.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/validateRequest.js)
- [`authValidation.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/authValidation.js)
- [`movieValidation.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/movieValidation.js)
- [`watchlistValidation.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/watchlistValidation.js)
- [`@validations.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/validations/@validations.md)

## Que hace `validateRequest`

`validateRequest` es un middleware generico.

Su trabajo es:

- recibir un schema de Zod
- validar `req.body`
- responder `400 Bad Request` si falla
- reemplazar `req.body` por `result.data` si la validacion sale bien

Eso permite que el controller trabaje con datos ya revisados y normalizados.

## Validaciones de `auth`

Ahora mismo `auth` usa:

- `registerSchema`
- `loginSchema`

Esos schemas validan:

- `name`
- `email`
- `password`

Y se usan en [`authRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/authRouters.js):

```javascript
router.post("/register", validateRequest(registerSchema), registerController);
router.post("/login", validateRequest(loginSchema), loginController);
```

## Validaciones de `movies`

Ahora mismo `movies` usa:

- `createMovieSchema`
- `updateMovieSchema`

Estos schemas validan campos como:

- `title`
- `overview`
- `description`
- `releaseDate`
- `genres`
- `runtime`
- `posterUrl`

`createdBy` ya no viaja en el body porque el controller lo toma desde `req.user.id`.

Y se usan en [`movieRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/movieRouters.js).

## Validaciones de `watchlist`

Ahora mismo `watchlist` usa:

- `addToWatchListSchema`
- `updateWatchListSchema`

Estos schemas validan:

- `movieId`
- `status`
- `rating`
- `notes`

Y se usan en [`watchListRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/watchListRouters.js).

## Ventaja de este enfoque

Separar la validacion del controller ayuda a que:

- el controller quede mas limpio
- las reglas se puedan reutilizar
- los errores de entrada sean mas consistentes
- el router deje claro que body espera cada endpoint

## Estructura actual relacionada

```text
src/
  validations/
    @validations.md
    validateRequest.js
    authValidation.js
    movieValidation.js
    watchlistValidation.js
  routers/
    authRouters.js
    movieRouters.js
    watchListRouters.js
```

## Lo que ya esta hecho

En esta fase ya tenemos:

- validacion generica con `validateRequest`
- `auth` validado con Zod
- `movies` validado con Zod
- `watchlist` validada con Zod
- documentacion interna de la carpeta `validations`

## Siguiente paso natural

El siguiente punto natural es seguir probando el flujo completo con datos reales y, si hace falta, anadir validacion tambien a `params` y `query`.

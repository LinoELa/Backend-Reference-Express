# prepararTodo

## Que significa "prepara todo"

Cuando en este proyecto se diga `prepara todo`, no significa hacer solo el cambio puntual que se ha pedido.

Significa revisar y dejar cerrado todo el bloque relacionado con esa parte del proyecto.

## Que se tiene que revisar

Si se pide `prepara todo`, hay que revisar:

- codigo
- comentarios
- imports y exports
- nombres de funciones
- nombres de archivos
- routers
- controllers
- utils
- seeds
- scripts de `package.json`
- validaciones
- archivos `@...md`
- documentacion general como `README.md` y `Docs/...`

## Que se tiene que corregir

Ademas del cambio principal, tambien hay que corregir:

- errores obvios
- partes copiadas mal
- nombres inconsistentes
- comentarios que no encajan con el codigo real
- rutas mal conectadas
- archivos nuevos sin documentar
- carpetas nuevas sin su `@...md`
- indices generales que no mencionan modulos nuevos
- schemas o middlewares de validacion sin conectar al router

## Estructura de comentarios del proyecto

Si se toca codigo existente o se crean archivos nuevos, tambien hay que respetar la estructura de comentarios que ya se usa en este repo.

La idea no es comentar por comentar.
La idea es que cada archivo quede facil de leer y siga el mismo patron visual.

### Patron base

Normalmente los archivos siguen esta forma:

1. cabecera de bloque con separadores visuales
2. imports
3. titulo del archivo o de la seccion principal
4. bloque `/** ... */` explicando que hace el archivo
5. comentarios cortos dentro del flujo cuando ayudan de verdad

### Ejemplo de cabeceras

```js
// ======================= IMPORTS =========================================

import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// ======================= AUTH MIDDLEWARE ================================
```

### Que debe incluir el bloque principal

El bloque de comentario grande suele incluir:

- resumen rapido en bullets
- explicacion corta del archivo
- una etiqueta tipo `@MIDDLEWARE`, `@ROUTER`, `@LOGIN`, `@WATCHLIST`

Ejemplo:

```js
/**
 * - Protege rutas privadas.
 * - Lee el token JWT
 * - Valida el token
 * - Busca al usuario autenticado
 * - Guarda el usuario en `req.user`
 *
 * Este archivo lee el token JWT, lo valida
 * y busca al usuario autenticado en la base de datos.
 *
 * Si todo sale bien, guarda ese usuario en `req.user`
 * para que el siguiente controller pueda usarlo.
 *
 * @MIDDLEWARE | auth
 *
 */
```

### Comentarios dentro del flujo

Cuando el flujo tiene varios pasos, se permite comentar cada bloque importante.

Ejemplo:

```js
// 1. Intentamos leer el token desde el header Authorization.
// Esperamos un formato como: Bearer <token>

// 2. Si no viene en el header, intentamos leerlo desde la cookie `token`.

// 3. Si no hay token, la ruta queda bloqueada.
```

### Regla practica

Si haces `preparar todo`, tambien hay que revisar:

- que los encabezados `// ======================= ... ========================` tengan sentido
- que el bloque `/** ... */` coincida con lo que el archivo hace de verdad
- que las etiquetas `@...` sean coherentes
- que los comentarios no expliquen cosas obvias
- que si un archivo del mismo bloque usa este estilo, el nuevo archivo tambien lo use

## Ejemplo de middleware con el estilo del proyecto

```js
// ======================= IMPORTS =========================================

import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// ======================= AUTH MIDDLEWARE ================================

/**
 * - Protege rutas privadas.
 * - Lee el token JWT
 * - Valida el token
 * - Busca al usuario autenticado
 * - Guarda el usuario en `req.user`
 *
 * Este archivo lee el token JWT, lo valida
 * y busca al usuario autenticado en la base de datos.
 *
 * Si todo sale bien, guarda ese usuario en `req.user`
 * para que el siguiente controller pueda usarlo.
 *
 * @MIDDLEWARE | auth
 *
 */

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Intentamos leer el token desde el header Authorization.
  // Esperamos un formato como: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Si no viene en el header, intentamos leerlo desde la cookie `token`.
  else if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.cookie?.token) {
    token = req.cookie.token;
  }

  // 3. Si no hay token, la ruta queda bloqueada.
  if (!token) {
    return res.status(401).json({
      error: "No token provided, authorization denied.",
    });
  }

  try {
    // 4. Verificamos que el token sea valido usando JWT_SECRET.
    // Si el token fue modificado o esta vencido, jwt.verify lanzara error.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Buscamos al usuario real en la base de datos con el `id`
    // guardado dentro del payload del token.
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    // 6. Si el token es valido pero el usuario ya no existe,
    // tambien negamos el acceso.
    if (!user) {
      return res.status(401).json({
        error: "User not found, authorization denied.",
      });
    }

    // 7. Guardamos el usuario autenticado dentro de `req.user`
    // para que los controllers siguientes no tengan que buscarlo otra vez.
    req.user = user;

    // 8. Si todo esta correcto, continuamos con la siguiente parte
    // del flujo: otro middleware o el controller final.
    next();
  } catch (error) {
    // Si el token es invalido, esta vencido o hay cualquier fallo
    // al verificarlo, respondemos con 401 Unauthorized.
    console.error("Error in auth middleware:", error);
    return res.status(401).json({
      error: "Invalid token, authorization denied.",
    });
  }
};

export { authMiddleware };
```

## Ejemplo de router con el estilo del proyecto

```js
// ======================= IMPORTS =========================================

import express from "express";
import { addToWatchListController } from "../controllers/watchList/addWatchListController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getWatchListController } from "../controllers/watchList/getWatchListController.js";
import { removeFromWatchListController } from "../controllers/watchList/removeWatchListController.js";
import { updateWatchListController } from "../controllers/watchList/updateWatchListController.js";
import { validateRequest } from "../validations/validateRequest.js";
import {
  addToWatchListSchema,
  updateWatchListSchema,
} from "../validations/watchlistValidation.js";

// ======================= EXPRESS ROUTER ==================================

/**
 * - Define las rutas de watchlist.
 * - Aplica middleware de autenticacion
 * - Conecta get, add, remove y update
 * - Usa schemas de validacion con Zod
 *
 * Importamos Express Router para definir rutas de watchlist.
 * @ROUTER | Express Router
 */

const router = express.Router();

// ======================= WATCHLIST MIDDLEWARE ============================

/**
 * Antes de llegar a las rutas de watchlist,
 * pasamos por el middleware de autenticacion.
 *
 * La idea es que solo un usuario autenticado
 * pueda trabajar con su watchlist.
 *
 * @MIDDLEWARE | authMiddleware
 */
router.use(authMiddleware);

// ======================= WATCHLIST ROUTES ================================

/**
 * Rutas de watchlist.
 * Este archivo define endpoints para gestionar peliculas
 * dentro de la lista personal del usuario.
 *
 * @WATCHLIST | /watchlist
 */
router.get("/", getWatchListController);
router.post("/", validateRequest(addToWatchListSchema), addToWatchListController);
router.delete("/:id", removeFromWatchListController);
router.put(
  "/:id",
  validateRequest(updateWatchListSchema),
  updateWatchListController
);

export default router;
```

## Que se tiene que agregar

Si falta algo necesario para que el bloque quede completo, tambien se debe agregar.

Por ejemplo:

- crear un `@watchList.md` si aparece una carpeta nueva `watchList`
- actualizar [`@controllers.md`](../../src/controllers/@controllers.md) si aparece un nuevo grupo de controllers
- actualizar [`@routers.md`](../../src/routers/@routers.md) si aparece un router nuevo
- crear `@validations.md` si aparece la carpeta `validations`
- actualizar seeds y su documentacion si cambia la estructura de `prisma/seed`
- actualizar `README.md` o `Docs/...` si el proyecto ya no coincide con lo escrito

## Idea principal

`prepara todo` significa:

- no dejar medias partes
- no esperar a que te pidan cada detalle por separado
- revisar lo relacionado
- completar lo que falte
- dejar esa parte lista para seguir con el siguiente bloque

## Ejemplo practico

Si se crea `watchList`:

- no basta con crear un solo controller de watchlist
- tambien hay que revisar el router
- tambien hay que revisar si `server.js` monta la ruta
- tambien hay que crear `@watchList.md`
- tambien hay que actualizar `@controllers.md`
- tambien hay que revisar la documentacion si ya afecta al flujo del proyecto

## Objetivo

La idea de `prepara todo` es que cada bloque quede:

- mas limpio
- mas claro
- documentado
- consistente
- listo para continuar con la siguiente parte del proyecto



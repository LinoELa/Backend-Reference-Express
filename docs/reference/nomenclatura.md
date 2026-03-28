# Nomenclatura del proyecto

## Objetivo

Este documento define como nombramos carpetas, archivos, modulos, endpoints, variables, clases y documentacion en este proyecto de backend sobre:

- `auth`
- `movies`
- `watchlist`

La idea es evitar:

- mezcla de idiomas sin criterio
- nombres distintos para la misma responsabilidad
- carpetas o archivos con estilos incompatibles
- documentacion desordenada

## Regla principal

En este proyecto seguimos esta base:

- el **codigo** se nombra principalmente en ingles
- la **estructura tecnica** se nombra en ingles
- la **documentacion** puede estar en espanol
- los **comentarios del codigo** pueden ir en espanol

## Regla de idioma

### En ingles

Estas piezas deben ir en ingles:

- carpetas de codigo dentro de `src/`
- nombres de modulos
- nombres de entidades
- nombres de use cases
- nombres de repositories
- nombres de services tecnicos
- nombres de middlewares
- nombres de variables y funciones
- endpoints HTTP
- nombres de archivos `.js`

Ejemplos:

- `auth`
- `movies`
- `watchlist`
- `shared`
- `createApp.js`
- `authMiddleware.js`
- `LoginUserUseCase.js`
- `PrismaMovieRepository.js`
- `GET /movies`

### En espanol

Estas piezas pueden ir en espanol:

- documentacion en `Docs/`
- archivos `@...md`
- comentarios explicativos del codigo
- explicaciones internas del equipo

Ejemplos:

- `Arquitectura-Hexagonal.md`
- `preparar-todo.md`
- `nomenclatura.md`
- comentarios de flujo dentro de un middleware

## Regla para carpetas principales

### Documentacion

En documentacion usamos mayuscula inicial para carpetas de alto nivel:

- `Docs`
- `Guides`
- `Reference`
- `Architecture`

### Codigo

En codigo usamos nombres simples y claros en ingles:

- `src/app`
- `src/shared`
- `src/modules`
- `prisma`
- `tests`

## Regla para modulos de negocio

Los modulos principales deben gritar negocio:

- `auth`
- `movies`
- `watchlist`

### Regla de singular y plural

- usa `auth` para autenticacion
- usa `movies` para el modulo funcional de peliculas
- usa `watchlist` para la lista personal del usuario
- usa singular para la entidad: `Movie`, `User`, `WatchlistItem`

Ejemplos:

- carpeta: `movies`
- entidad: `Movie`
- variable: `movie`
- lista: `movies`

## Regla para carpetas de arquitectura interna

Si usas la estructura hexagonal, cada modulo debe repetir:

```text
feature/
|-- domain/
|-- application/
`-- infrastructure/
```

Esos nombres deben mantenerse iguales en todos los slices.

## Regla para archivos de codigo

### App y bootstrap

Usan nombres descriptivos en `camelCase`.

Ejemplos:

- `createApp.js`
- `registerRoutes.js`
- `buildModules.js`
- `prismaClient.js`

### Middlewares

Usan nombre descriptivo + `Middleware`.

Ejemplos:

- `authMiddleware.js`
- `errorHandler.js`
- `validateRequest.js`
- `notFoundHandler.js`

### Controllers legacy

Si el proyecto sigue con la estructura actual, el patron puede ser:

- `loginController.js`
- `registerController.js`
- `addMovieController.js`
- `getWatchListController.js`

### Controllers en arquitectura mas completa

Si el proyecto evoluciona a la version mas estricta, el patron recomendado es:

- `LoginPostController.js`
- `RegisterPostController.js`
- `ListMoviesGetController.js`
- `AddWatchlistPostController.js`

## Regla para casos de uso

Los casos de uso deben ir en `PascalCase` y terminar en `UseCase`.

Ejemplos:

- `RegisterUserUseCase.js`
- `LoginUserUseCase.js`
- `CreateMovieUseCase.js`
- `ListWatchlistUseCase.js`

## Regla para repositories y adapters

### Puertos o contratos

Se nombran por responsabilidad:

- `AuthRepository.js`
- `MovieRepository.js`
- `WatchlistRepository.js`
- `TokenService.js`
- `PasswordHasher.js`

### Implementaciones tecnicas

Se nombran con el adaptador concreto delante:

- `PrismaAuthRepository.js`
- `PrismaMovieRepository.js`
- `PrismaWatchlistRepository.js`
- `JwtTokenService.js`
- `BcryptPasswordHasher.js`

## Regla para entidades, clases y errores

Usan `PascalCase`.

Ejemplos:

- `User.js`
- `Movie.js`
- `WatchlistItem.js`
- `AppError.js`

## Regla para funciones y variables

Dentro del codigo usamos ingles tecnico y `camelCase`.

Ejemplos:

- `generateToken`
- `connectDB`
- `disconnectDB`
- `loginController`
- `authRepository`
- `watchlistItem`
- `createdBy`

## Regla para constantes y enums

Si una constante funciona como valor global o enum tecnico, puede ir en mayusculas.

Ejemplos:

- `WATCHLIST_STATUS`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Regla para endpoints

Los endpoints van en ingles y en minusculas.

Ejemplos actuales:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /movies`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`
- `GET /watchlist`
- `POST /watchlist`

## Regla para archivos de Prisma

En `prisma/` se mantiene la nomenclatura propia de Prisma:

- `schema.prisma`
- `migrations/`
- `seed/`

### Seeds

Los archivos de seed deben ser claros y directos:

- `userSeed.js`
- `movieSeed.js`
- `watchlistSeed.js`
- `index.js`

## Regla para documentacion

### Guides

Las guias numeradas usan este patron:

```text
01-nombre-del-bloque.md
02-nombre-del-bloque.md
03-nombre-del-bloque.md
```

Ejemplos:

- `01-setup-nodejs-server.md`
- `04-jwt-authentication.md`
- `09-movie-controllers-and-get.md`

### Reference

Los archivos de consulta rapida usan nombres descriptivos sin numeracion.

Ejemplos:

- `github-workflow.md`
- `http-status.md`
- `preparar-todo.md`
- `nomenclatura.md`

### Architecture

Los documentos de arquitectura usan nombres claros y descriptivos.

Ejemplos:

- `Arquitectura-Hexagonal.md`
- `hexagonal-rules.md`
- `dependency-rule.md`
- `audit-and-mapping.md`
- `migration-plan.md`

## Regla para archivos `@...md`

Los archivos `@...md` sirven como indice o explicacion de carpeta.

Ejemplos:

- `@Guides.md`
- `@Reference.md`
- `@Architecture.md`

Su trabajo es explicar:

- que guarda la carpeta
- para que sirve
- que tipo de archivos entran ahi

## Regla para comentarios del codigo

Los comentarios pueden ir en espanol y siguen la estructura visual que ya usa el proyecto.

Ejemplo de estilo:

- separadores tipo `// ======================= ... ========================`
- bloque `/** ... */` con resumen del archivo
- comentarios cortos dentro del flujo cuando de verdad ayudan

### Importante

Los comentarios deben:

- explicar intencion
- explicar decisiones
- explicar pasos del flujo cuando no son obvios

No deben:

- repetir literalmente lo que ya dice el codigo
- meter texto innecesario
- romper el patron visual del proyecto

## Regla de consistencia

Una misma responsabilidad debe conservar el mismo nombre en todo el repo.

Ejemplos:

- si eliges `watchlist`, no mezclar despues `watch-list`, `my-list` o `movie-list`
- si eliges `movies`, no mezclar luego `films` para la misma feature
- si eliges `JwtTokenService`, no crear luego `TokenJwtManager` para la misma pieza

## Checklist rapido antes de crear un nombre nuevo

Antes de crear una carpeta o archivo nuevo, revisa:

1. si pertenece a `app`, `shared`, `modules`, `prisma` o `Docs`
2. si debe vivir en `auth`, `movies` o `watchlist`
3. si debe nombrarse en ingles o en espanol
4. si el tipo de archivo ya tiene un patron en el proyecto
5. si ya existe otra pieza con el mismo significado pero otro nombre

## Idea principal

La regla base de este proyecto es esta:

- ingles para la estructura tecnica
- espanol para explicar y documentar
- nombres simples, consistentes y repetibles

Eso permite que el proyecto siga creciendo sin perder orden ni claridad.

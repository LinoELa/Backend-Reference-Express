# Arquitectura Hexagonal + Vertical Slicing + Screaming (Proyecto Movies)

Este documento define **solo la arquitectura objetivo** para este proyecto de peliculas.

No es una auditoria del repo ni un plan de migracion paso a paso.
La idea es mostrar **como deberia quedar organizado este backend** si lo llevamos a:

- **Hexagonal**
- **Vertical Slicing**
- **Screaming Architecture**

El dominio principal de este proyecto es:

- `auth`
- `movies`
- `watchlist`

---

## 1) Que significa aqui

### Hexagonal

La logica del negocio no depende de Express, Prisma ni JWT.

- `domain`: reglas y contratos
- `application`: casos de uso
- `infrastructure`: detalles tecnicos como Prisma, JWT, bcrypt y HTTP

### Vertical Slicing

Cada feature vive junta en su propia carpeta:

- `auth`
- `movies`
- `watchlist`

No se separa primero por `controllers`, `routers`, `middlewares`, etc.

### Screaming Architecture

Cuando alguien abre `src/`, el proyecto debe gritar negocio:

```text
auth
movies
watchlist
```

y no solo tecnologia:

```text
controllers
routers
validations
middlewares
```

---

## 2) Estructura objetivo del proyecto

No hay una sola forma correcta de organizarlo.

Para este proyecto de `movies` tiene sentido pensar en **2 versiones**:

- una **minimalista**, ideal para el tamaño actual del proyecto
- una **completa**, pensada para cuando el backend crezca bastante

### 2.1 Version minimalista

Esta es la que mejor encaja **ahora mismo** con tu proyecto.

Mantiene Hexagonal + Vertical Slicing + Screaming, pero sin meter demasiadas capas o carpetas extra.

```text
backend-reference-express/
|-- server.js                                 # Punto de entrada
|-- package.json                              # Scripts y dependencias
|-- prisma.config.ts                          # Configuracion de Prisma
|-- README.md                                 # Guia general
|
|-- Docs/
|   |-- Project/
|   |-- Reference/
|   `-- Architecture/
|       `-- Arquitectura-Hexagonal.md         # Documento principal de arquitectura
|
|-- src/
|   |-- app/
|   |   |-- createApp.js                      # Configura Express
|   |   `-- registerRoutes.js                 # Monta auth, movies y watchlist
|   |
|   |-- shared/
|   |   |-- errors/
|   |   |   `-- AppError.js                   # Error reutilizable
|   |   |-- middlewares/
|   |   |   |-- authMiddleware.js             # Middleware de auth
|   |   |   |-- validateRequest.js            # Middleware Zod
|   |   |   `-- errorHandler.js               # Manejo de errores
|   |   `-- prisma/
|   |       `-- prismaClient.js               # Prisma compartido
|   |
|   `-- modules/
|       |-- auth/
|       |   |-- domain/
|       |   |   |-- User.js
|       |   |   |-- AuthRepository.js
|       |   |   |-- PasswordHasher.js
|       |   |   `-- TokenService.js
|       |   |-- application/
|       |   |   |-- RegisterUserUseCase.js
|       |   |   |-- LoginUserUseCase.js
|       |   |   `-- LogoutUseCase.js
|       |   `-- infrastructure/
|       |       |-- authRoutes.js
|       |       |-- authSchemas.js
|       |       |-- authControllers.js
|       |       |-- PrismaAuthRepository.js
|       |       |-- BcryptPasswordHasher.js
|       |       |-- JwtTokenService.js
|       |       `-- container.js
|       |
|       |-- movies/
|       |   |-- domain/
|       |   |   |-- Movie.js
|       |   |   `-- MovieRepository.js
|       |   |-- application/
|       |   |   |-- CreateMovieUseCase.js
|       |   |   |-- ListMoviesUseCase.js
|       |   |   |-- UpdateMovieUseCase.js
|       |   |   `-- RemoveMovieUseCase.js
|       |   `-- infrastructure/
|       |       |-- movieRoutes.js
|       |       |-- movieSchemas.js
|       |       |-- movieControllers.js
|       |       |-- PrismaMovieRepository.js
|       |       `-- container.js
|       |
|       `-- watchlist/
|           |-- domain/
|           |   |-- WatchlistItem.js
|           |   `-- WatchlistRepository.js
|           |-- application/
|           |   |-- AddMovieToWatchlistUseCase.js
|           |   |-- ListWatchlistUseCase.js
|           |   |-- UpdateWatchlistItemUseCase.js
|           |   `-- RemoveWatchlistItemUseCase.js
|           `-- infrastructure/
|               |-- watchlistRoutes.js
|               |-- watchlistSchemas.js
|               |-- watchlistControllers.js
|               |-- PrismaWatchlistRepository.js
|               `-- container.js
|
|-- prisma/
|   |-- schema.prisma
|   |-- migrations/
|   `-- seed/
|       |-- index.js
|       |-- userSeed.js
|       |-- movieSeed.js
|       `-- watchlistSeed.js
|
`-- tests/
    |-- auth/
    |-- movies/
    `-- watchlist/
```

#### Cuando usar esta version

- cuando el proyecto tiene pocos modulos
- cuando solo hay una API Express
- cuando Prisma es la unica persistencia real
- cuando quieres arquitectura limpia sin sobrecargar el repo

#### Por que esta version encaja con tu proyecto ahora

- ya tienes `auth`, `movies` y `watchlist`
- no necesitas 20 carpetas por modulo todavia
- sigues teniendo Hexagonal real
- la lectura del repo sigue siendo simple

### 2.2 Version completa

Esta version es la que conviene cuando el proyecto crece y empiezan a aparecer mas necesidades:

- mas modulos
- mas integraciones
- mas tests
- mas equipo
- mas reglas de negocio
- mas documentacion interna

```text
backend-reference-express/
|-- server.js                                 # Punto de entrada
|-- package.json                              # Scripts y dependencias
|-- prisma.config.ts                          # Configuracion de Prisma
|-- README.md                                 # Guia general del proyecto
|
|-- Docs/
|   |-- Project/
|   |-- Reference/
|   `-- Architecture/
|       |-- Arquitectura-Hexagonal.md         # Documento principal
|       |-- hexagonal-rules.md                # Reglas practicas
|       |-- dependency-rule.md                # Quien puede depender de quien
|       |-- audit-and-mapping.md              # Documento complementario de auditoria/mapeo
|       `-- migration-plan.md                 # Evolucion de estructura
|
|-- src/
|   |-- app/
|   |   |-- createApp.js                      # Configura Express y middlewares globales
|   |   |-- registerRoutes.js                 # Monta rutas
|   |   `-- buildModules.js                   # Construye modulos
|   |
|   |-- shared/
|   |   |-- domain/
|   |   |   `-- errors/
|   |   |       `-- AppError.js
|   |   `-- infrastructure/
|   |       |-- prisma/
|   |       |   `-- prismaClient.js
|   |       `-- http/
|   |           `-- middlewares/
|   |               |-- authMiddleware.js
|   |               |-- validateRequest.js
|   |               |-- errorHandler.js
|   |               `-- notFoundHandler.js
|   |
|   `-- modules/
|       |-- auth/
|       |   |-- domain/
|       |   |   |-- entities/
|       |   |   |   `-- User.js
|       |   |   `-- ports/
|       |   |       |-- AuthRepository.js
|       |   |       |-- PasswordHasher.js
|       |   |       `-- TokenService.js
|       |   |-- application/
|       |   |   |-- register/
|       |   |   |   `-- RegisterUserUseCase.js
|       |   |   |-- login/
|       |   |   |   `-- LoginUserUseCase.js
|       |   |   `-- logout/
|       |   |       `-- LogoutUseCase.js
|       |   `-- infrastructure/
|       |       |-- persistence/
|       |       |   `-- PrismaAuthRepository.js
|       |       |-- security/
|       |       |   |-- BcryptPasswordHasher.js
|       |       |   `-- JwtTokenService.js
|       |       |-- validation/
|       |       |   `-- authSchemas.js
|       |       |-- http/
|       |       |   |-- authRoutes.js
|       |       |   `-- controllers/
|       |       |       |-- RegisterPostController.js
|       |       |       |-- LoginPostController.js
|       |       |       `-- LogoutPostController.js
|       |       `-- container.js
|       |
|       |-- movies/
|       |   |-- domain/
|       |   |   |-- entities/
|       |   |   |   `-- Movie.js
|       |   |   `-- ports/
|       |   |       `-- MovieRepository.js
|       |   |-- application/
|       |   |   |-- create/
|       |   |   |   `-- CreateMovieUseCase.js
|       |   |   |-- list/
|       |   |   |   `-- ListMoviesUseCase.js
|       |   |   |-- update/
|       |   |   |   `-- UpdateMovieUseCase.js
|       |   |   `-- remove/
|       |   |       `-- RemoveMovieUseCase.js
|       |   `-- infrastructure/
|       |       |-- persistence/
|       |       |   `-- PrismaMovieRepository.js
|       |       |-- validation/
|       |       |   `-- movieSchemas.js
|       |       |-- http/
|       |       |   |-- movieRoutes.js
|       |       |   `-- controllers/
|       |       |       |-- CreateMoviePostController.js
|       |       |       |-- ListMoviesGetController.js
|       |       |       |-- UpdateMoviePutController.js
|       |       |       `-- RemoveMovieDeleteController.js
|       |       `-- container.js
|       |
|       `-- watchlist/
|           |-- domain/
|           |   |-- entities/
|           |   |   `-- WatchlistItem.js
|           |   `-- ports/
|           |       `-- WatchlistRepository.js
|           |-- application/
|           |   |-- add/
|           |   |   `-- AddMovieToWatchlistUseCase.js
|           |   |-- list/
|           |   |   `-- ListWatchlistUseCase.js
|           |   |-- update/
|           |   |   `-- UpdateWatchlistItemUseCase.js
|           |   `-- remove/
|           |       `-- RemoveWatchlistItemUseCase.js
|           `-- infrastructure/
|               |-- persistence/
|               |   `-- PrismaWatchlistRepository.js
|               |-- validation/
|               |   `-- watchlistSchemas.js
|               |-- http/
|               |   |-- watchlistRoutes.js
|               |   `-- controllers/
|               |       |-- AddWatchlistPostController.js
|               |       |-- ListWatchlistGetController.js
|               |       |-- UpdateWatchlistPutController.js
|               |       `-- RemoveWatchlistDeleteController.js
|               `-- container.js
|
|-- prisma/
|   |-- schema.prisma
|   |-- migrations/
|   `-- seed/
|       |-- index.js
|       |-- userSeed.js
|       |-- movieSeed.js
|       `-- watchlistSeed.js
|
`-- tests/
    |-- auth/
    |-- movies/
    `-- watchlist/
```

#### Cuando usar esta version

- cuando metas modulos como `reviews`, `favorites`, `recommendations`, `notifications`
- cuando haya mas adaptadores aparte de Prisma
- cuando entre mas gente al proyecto
- cuando quieras separar mejor controllers, persistence, security y validation

### 2.3 Regla interna que se repite en cualquier version

Da igual si eliges la version minimalista o la completa.
La base se mantiene:

```text
feature/
|-- domain/
|-- application/
`-- infrastructure/
```

### 2.4 Cual te recomiendo para este proyecto

Para **tu proyecto actual**, yo recomiendo esta regla:

- usa la **version minimalista** como arquitectura real del codigo
- deja la **version completa** como arquitectura de crecimiento

Asi no sobrecargas el repo ahora, pero tampoco te quedas sin camino cuando el proyecto crezca.

### 2.5 Nota sobre `container.js`

En ambas versiones merece la pena usar `container.js` por modulo porque:

- conecta repositorios, use cases y controllers
- evita meter wiring dentro de `routes`
- mantiene limpia la separacion hexagonal

---

## 3) Regla de dependencias

La regla importante es esta:

- `domain` no conoce Express
- `domain` no conoce Prisma
- `domain` no conoce JWT
- `application` trabaja con puertos de `domain`
- `infrastructure` implementa esos puertos
- `http` solo adapta request/response

Flujo:

```text
HTTP Route
  -> HTTP Controller
  -> Use Case
  -> Domain Port
  -> Infrastructure Adapter
  -> PostgreSQL / JWT / bcrypt
```

---

## 4) Como se aplica a este proyecto

### auth

Aqui vive todo lo relacionado con:

- register
- login
- logout
- hashing de password
- generacion y verificacion de JWT

### movies

Aqui vive todo lo relacionado con:

- listar peliculas
- crear peliculas
- actualizar peliculas
- borrar peliculas
- validar que solo el creador pueda editar o borrar

### watchlist

Aqui vive todo lo relacionado con:

- agregar movie a watchlist
- listar watchlist del usuario
- actualizar status, rating y notes
- borrar item de watchlist
- evitar duplicados por usuario y movie

---

## 5) Prisma y seed dentro de esta arquitectura

`prisma/` sigue fuera de `src/` porque sigue siendo infraestructura global del proyecto.

Dentro de `prisma/` se mantiene:

- `schema.prisma`
- `migrations/`
- `seed/`

Y el `seed/` puede quedar asi:

```text
prisma/seed/
|-- index.js
|-- userSeed.js
|-- movieSeed.js
`-- watchlistSeed.js
```

Esto encaja bien porque:

- Prisma sigue siendo persistencia
- los seeds siguen siendo soporte de datos
- no forman parte del dominio puro

---

## 6) Ejemplo corto de un slice

Ejemplo del modulo `movies`:

```text
movies/
|-- domain/
|   |-- entities/
|   |   `-- Movie.js
|   `-- ports/
|       `-- MovieRepository.js
|-- application/
|   |-- create/
|   |   `-- CreateMovieUseCase.js
|   |-- list/
|   |   `-- ListMoviesUseCase.js
|   |-- update/
|   |   `-- UpdateMovieUseCase.js
|   `-- remove/
|       `-- RemoveMovieUseCase.js
`-- infrastructure/
    |-- persistence/
    |   `-- PrismaMovieRepository.js
    |-- validation/
    |   `-- movieSchemas.js
    `-- http/
        |-- movieRoutes.js
        `-- controllers/
            |-- CreateMoviePostController.js
            |-- ListMoviesGetController.js
            |-- UpdateMoviePutController.js
            `-- RemoveMovieDeleteController.js
```

Lectura rapida:

- `domain`: que es una movie y que contrato necesita
- `application`: que puede hacer el sistema con movies
- `infrastructure`: como se conecta eso con Express y Prisma

---

## 7) Ejemplo corto de archivos

### `src/modules/auth/domain/ports/AuthRepository.js`

```js
export class AuthRepository {
  async findByEmail(_email) {
    throw new Error("AuthRepository.findByEmail not implemented");
  }

  async findById(_id) {
    throw new Error("AuthRepository.findById not implemented");
  }

  async create(_data) {
    throw new Error("AuthRepository.create not implemented");
  }
}
```

### `src/modules/auth/application/login/LoginUserUseCase.js`

```js
export class LoginUserUseCase {
  constructor({ authRepository, passwordHasher, tokenService }) {
    this.authRepository = authRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ email, password }) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new Error("Credenciales invalidas");

    const valid = await this.passwordHasher.compare(password, user.password);
    if (!valid) throw new Error("Credenciales invalidas");

    return {
      token: this.tokenService.sign({ id: user.id }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
```

### `src/modules/auth/infrastructure/persistence/PrismaAuthRepository.js`

```js
export class PrismaAuthRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data) {
    return this.prisma.user.create({ data });
  }
}
```

---

## 8) Resumen final

Si se aplica bien a este proyecto, el resultado correcto es este:

- `auth`, `movies` y `watchlist` como slices principales
- `domain`, `application` e `infrastructure` dentro de cada slice
- `shared/` solo para piezas transversales
- `prisma/` como infraestructura global
- Express y Prisma fuera del dominio

En corto:

```text
Hexagonal = separar negocio de tecnologia
Vertical Slicing = agrupar por feature
Screaming = que el repo grite auth, movies y watchlist
```

Eso si es exactamente la arquitectura **Hexagonal + Vertical Slicing + Screaming** aplicada a este proyecto.

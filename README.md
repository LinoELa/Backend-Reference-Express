# Backend Reference Express

Backend con `Express`, `Prisma`, `PostgreSQL` y `JWT`.

Este proyecto trabaja autenticacion de usuarios, peliculas y watchlist. Ahora mismo ya incluye:

- registro de usuarios
- login y logout
- generacion de JWT
- Prisma con PostgreSQL
- IDs tipo UUID
- validaciones con Zod
- seed de usuarios
- seed de peliculas
- rutas de watchlist protegidas

## GitHub About

### Short description

```text
Express backend reference with Prisma, PostgreSQL, JWT auth, watchlist, and Zod validations.
```

### Topics

```text
express
nodejs
backend
api
prisma
postgresql
jwt
authentication
middleware
zod
validation
watchlist
seed
reference-project
```

### Website

Puedes usar:

```text
https://github.com/LinoELa/backend-reference-express
```

Si prefieres, tambien puedes dejar `Website` vacio hasta que tengas:

- Swagger
- docs desplegadas
- frontend
- API online

## Stack

- `Node.js`
- `Express`
- `Prisma`
- `PostgreSQL`
- `@prisma/adapter-pg`
- `bcryptjs`
- `jsonwebtoken`
- `dotenv`
- `cookie-parser`

## Estructura base

```text
src/
  config/
  controllers/
    auth/
    movie/
    watchList/
  middlewares/
  routers/
  validations/
  utils/
    token/
prisma/
  migrations/
  seed/
Docs/
```

## Variables de entorno

Primero copia `.env.example` a `.env`.

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Variables esperadas:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="replace_with_a_secure_random_secret"
JWT_EXPIRES_IN="7d"
```

## Instalacion

```bash
npm install
```

## Comandos importantes

### Desarrollo

```bash
npm run dev
```

Levanta el servidor con `nodemon`.

### Produccion

```bash
npm start
```

### Generar Prisma Client

```bash
npx prisma generate
```

### Crear una migracion nueva

```bash
npx prisma migrate dev --name nombre_del_cambio
```

### Resetear la base de datos en desarrollo

```bash
npx prisma migrate reset
```

### Abrir Prisma Studio

```bash
npx prisma studio
```

### Seed de usuarios

```bash
npm run seed:users
```

### Seed de peliculas

```bash
npm run seed:movies
```

## Como arrancar el proyecto desde cero

1. instala dependencias
2. copia `.env.example` a `.env`
3. rellena `DATABASE_URL` y `JWT_SECRET`
4. genera Prisma Client
5. aplica migraciones
6. levanta el servidor

Comandos:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Rutas actuales

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`

### Movies

- `GET /movies`
- `POST /movies`
- `PUT /movies/:id`
- `DELETE /movies/:id`

### Watchlist

- `GET /watchlist`
- `POST /watchlist`
- `DELETE /watchlist/:id`
- `PUT /watchlist/:id`

## Autenticacion

El login genera un JWT con `generateToken(user.id, res)`.

En este proyecto:

- el `id` del usuario es `UUID`
- la password se guarda con `bcrypt`
- el token se firma con `JWT_SECRET`

## Base de datos

Modelos principales:

- `User`
- `Movie`
- `watchlistItem`

Relaciones importantes:

- `Movie.createdBy` guarda el UUID del usuario creador
- `watchlistItem` relaciona usuario y pelicula
- `@@unique([userId, movieId])` evita duplicados en watchlist
- al crear una movie, `createdBy` sale de `req.user.id`

## Seeds

### `userSeed.js`

Crea usuarios base:

- `Root`
- `Admin`
- `Lucia`
- `Mateo`
- `Sofia`

### `movieSeeds.js`

Crea peliculas de ejemplo usando un `userId` manual que debe existir previamente en la tabla `User`.

Flujo recomendado:

1. ejecutar `npm run seed:users`
2. copiar un UUID real de usuario
3. pegar ese UUID en `movieSeeds.js`
4. ejecutar `npm run seed:movies`

## Estado actual del proyecto

Ahora mismo ya esta montado:

- servidor Express
- conexion a PostgreSQL
- Prisma con migraciones
- auth con JWT
- IDs UUID
- seeds separados por usuarios y peliculas
- watchlist con `GET`, add, remove y update
- movies con controllers reales

## Estado de watchlist

Ahora mismo `watchlist` ya:

- usa `authMiddleware`
- permite listar la watchlist del usuario con `GET`
- trabaja con `req.user.id`
- valida `POST` y `PUT` con Zod
- evita duplicados por usuario y pelicula

## Estado de movies

Ahora mismo `movies` ya:

- tiene carpeta propia de controllers
- permite listar peliculas con `GET`
- protege `POST`, `PUT` y `DELETE` con `authMiddleware`
- usa `req.user.id` como `createdBy`
- valida `POST` y `PUT` con Zod

## Siguiente paso

El siguiente punto natural es probar el flujo completo desde login hasta watchlist y seguir ampliando rutas privadas.

## Documentacion interna

Tienes documentacion adicional en:

- `Docs/Project/01-setup-nodejs-server.md`
- `Docs/Project/02-database-and-routers.md`
- `Docs/Project/03-postgresql-prisma.md`
- `Docs/Project/04-jwt-authentication.md`
- `Docs/Project/05-seed-file.md`
- `Docs/Project/06-watchlist-routes-and-controllers.md`
- `Docs/Project/07-middleware.md`
- `Docs/Project/08-validations.md`
- `Docs/Project/09-movie-controllers-and-get.md`
- `Docs/Reference/github-workflow.md`
- `Docs/Reference/http-status.md`
- `Docs/Reference/preparar-todo.md`
- `Docs/Architecture/Arquitectura-Hexagonal.md`


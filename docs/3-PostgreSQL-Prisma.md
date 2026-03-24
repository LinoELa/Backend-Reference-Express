# PostgreSQL, Prisma y Dotenv

## PostgreSQL

PostgreSQL es un sistema de gestion de bases de datos relacional (RDBMS) open source, potente y muy usado en backend por su estabilidad, rendimiento y soporte para consultas complejas.

## Prisma

Prisma es un ORM (Object-Relational Mapping) para Node.js y TypeScript. Permite:

- definir el esquema de la base de datos
- generar un cliente tipado
- crear y ejecutar migraciones
- consultar datos de forma mas comoda y segura

### Instalacion

```bash
npm install @prisma/client
npm install prisma --save-dev
```

### Inicializar Prisma

```bash
npx prisma init
```

Esto crea, entre otras cosas:

- el archivo `.env`
- la carpeta `prisma/`
- el archivo `prisma/schema.prisma`

### Configurar la conexion

En `.env`:

```env
DATABASE_URL="postgresql://usuario:contrasena@localhost:5432/mi_base_de_datos"
```

### Ejemplo basico de `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

### Generar cliente y migraciones

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Nota para este proyecto

Si vas a manejar una watchlist, conviene anadir `@@unique([userId, movieId])` dentro del modelo `watchlistItem`.

No es obligatorio para Prisma, pero si muy recomendable para evitar que un usuario meta la misma pelicula dos veces en su watchlist.

Si quieres guardar quien creo una pelicula, el campo correcto en `Movie` es `createdBy`, no `createBy`.

### Ejemplo de esquema para este proyecto

```prisma
// Genera el cliente de Prisma para usarlo desde Node.js
generator client {
  provider = "prisma-client-js"
}

// Configura la conexion con PostgreSQL usando la variable DATABASE_URL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Tabla de usuarios
model User {
  id             Int             @id @default(autoincrement())
  name           String
  email          String          @unique
  password       String
  createdAt      DateTime        @default(now())
  movies         Movie[]         @relation("MovieCreator")
  watchlistItems watchlistItem[]
}

// Tabla de peliculas
model Movie {
  id             Int             @id @default(autoincrement())
  title          String
  overview       String?
  description    String
  releaseDate    DateTime
  genres         String[]        @default([])
  runtime        Int?
  posterUrl      String?
  createdBy      String
  createdAt      DateTime        @default(now())
  creator        User            @relation("MovieCreator", fields: [createdBy], references: [email])
  watchlistItems watchlistItem[]
}

// Estados posibles para una pelicula dentro de la watchlist
enum WATCHLIST_STATUS {
  PLANNED
  WATCHING
  COMPLETED
  DROPPED
}

// Tabla intermedia entre usuarios y peliculas
model watchlistItem {
  id        Int              @id @default(autoincrement())
  movieId   Int
  userId    Int
  status    WATCHLIST_STATUS @default(PLANNED)
  rating    Int?
  notes     String?
  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie Movie @relation(fields: [movieId], references: [id])

  @@unique([userId, movieId])
}
```

### Que significa este esquema

- `generator client`: crea el cliente de Prisma que luego importas en tu aplicacion para hacer consultas.
- `datasource db`: define que la base de datos del proyecto es PostgreSQL y que la conexion sale de `.env`.
- `User`: guarda los datos del usuario y sus relaciones con peliculas creadas y elementos de watchlist.
- `Movie`: representa cada pelicula. El campo `createdBy` permite saber que usuario la creo.
- `watchlistItem`: funciona como tabla intermedia entre `User` y `Movie`, y ademas guarda informacion propia como `status`, `rating` y `notes`.
- `WATCHLIST_STATUS`: evita escribir estados libres como texto y te fuerza a usar valores controlados.
- `@@unique([userId, movieId])`: impide que un mismo usuario repita la misma pelicula dentro de su watchlist.

### Comentarios utiles

- `createdAt` con `@default(now())` guarda la fecha automaticamente al crear el registro.
- `updatedAt` con `@updatedAt` se actualiza solo cada vez que modificas ese item.
- `String[]` en `genres` aprovecha que PostgreSQL soporta arrays de texto.
- `onDelete: Cascade` hace que si se borra un usuario, tambien se borren sus elementos de watchlist relacionados.
- Si despues quieres guardar mas informacion del creador de la pelicula, otra opcion mas comun es usar `createdById Int` y relacionarlo con `User.id` en lugar del email.

## Comandos utiles de Prisma

- `npx prisma migrate dev --name <nombre>`: crea y aplica una migracion en desarrollo
- `npx prisma migrate deploy`: aplica migraciones en produccion
- `npx prisma db push`: sincroniza el esquema sin crear migraciones
- `npx prisma studio`: abre la interfaz grafica para gestionar datos
- `npx prisma generate`: genera el cliente de Prisma
- `npx prisma db seed`: ejecuta el seeding de la base de datos

## Dotenv

`dotenv` sirve para cargar variables de entorno desde un archivo `.env` dentro de tu aplicacion Node.js.

Prisma ya lee `.env` automaticamente, asi que no necesitas configurar `dotenv` dentro de `schema.prisma`.

En tu aplicacion si puedes usarlo asi:

```bash
npm install dotenv
```

Luego, en tu archivo principal:

```javascript
import "dotenv/config";
```

O tambien:

```javascript
import dotenv from "dotenv";

dotenv.config();
```

## Otros ORMs

### Sequelize

- uno de los ORMs mas antiguos del ecosistema Node.js
- compatible con MySQL, PostgreSQL y SQLite
- basado en modelos clasicos tipo Active Record

Ideal para proyectos legacy o enfoques mas tradicionales.

### TypeORM

- muy usado en proyectos Node.js con TypeScript
- compatible con PostgreSQL, MySQL, SQLite y mas
- soporta Active Record y Data Mapper
- muy comun en proyectos con NestJS

Ideal si quieres una estructura mas orientada a entidades y decorators.

### Drizzle ORM

- ORM moderno y ligero
- muy centrado en TypeScript
- tipado fuerte y consultas bastante explicitas
- buena opcion si quieres mas control y menos abstraccion

Ideal si buscas simplicidad, tipado solido y un enfoque mas moderno.

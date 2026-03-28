# PostgreSQL, Prisma y Dotenv

## PostgreSQL

PostgreSQL es un sistema de gestion de bases de datos relacional muy usado en backend por su estabilidad, rendimiento y soporte para consultas complejas.

## Prisma

Prisma es un ORM para Node.js y TypeScript. Permite:

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

## Como sacar los datos de conexion

Si ya tienes una `DATABASE_URL`, de ahi puedes extraer estos datos:

- `host`
- `puerto`
- `nombre de la base`
- `usuario`
- `password`

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:contrasena@localhost:5432/mi_base_de_datos"
```

De esa URL sale esto:

- `usuario`: `usuario`
- `password`: `contrasena`
- `host`: `localhost`
- `puerto`: `5432`
- `nombre de la base`: `mi_base_de_datos`

La estructura general es:

```text
postgresql://USUARIO:PASSWORD@HOST:PUERTO/NOMBRE_BD
```

### Ejemplo con Neon

Si tu terminal muestra algo como esto:

```text
ep-proud-meadow-anj46pem-pooler.c-6.us-east-1.aws.neon.tech
```

entonces normalmente los datos visibles serian:

- `host`: `ep-proud-meadow-anj46pem-pooler.c-6.us-east-1.aws.neon.tech`
- `puerto`: `5432`
- `nombre de la base`: `neondb`
- `usuario`: se obtiene mirando la `DATABASE_URL` completa en `.env`
- `password`: es la parte entre `usuario:` y `@host` dentro de la `DATABASE_URL`

Ejemplo de estructura:

```text
postgresql://USUARIO:PASSWORD@HOST:5432/neondb
```

### Como verlo en DBeaver

Si ya tienes la base conectada en DBeaver:

1. abre DBeaver
2. click derecho sobre la conexion
3. pulsa `Edit Connection`
4. revisa los campos `Host`, `Port`, `Database`, `Username` y `Password`

Con eso puedes reconstruir la `DATABASE_URL`.

### Importante

- no compartas la password en capturas o apuntes
- si ensenas la `DATABASE_URL`, tapa la parte de la contrasena
- DBeaver y Prisma usan los mismos datos de conexion; solo cambia el formato

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
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String          @id @default(uuid())
  name           String
  email          String          @unique
  password       String
  createdAt      DateTime        @default(now())
  movies         Movie[]         @relation("MovieCreator")
  watchlistItems watchlistItem[]
}

model Movie {
  id             String          @id @default(uuid())
  title          String
  overview       String?
  description    String
  releaseDate    DateTime
  genres         String[]        @default([])
  runtime        Int?
  posterUrl      String?
  createdBy      String
  createdAt      DateTime        @default(now())
  creator        User            @relation("MovieCreator", fields: [createdBy], references: [id], onDelete: Cascade)
  watchlistItems watchlistItem[]
}

enum WATCHLIST_STATUS {
  PLANNED
  WATCHING
  COMPLETED
  DROPPED
}

model watchlistItem {
  id        String           @id @default(uuid())
  movieId   String
  userId    String
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

- `generator client`: crea el cliente de Prisma que luego importas en tu aplicacion para hacer consultas
- `datasource db`: define que la base de datos del proyecto es PostgreSQL y que la conexion sale de `.env`
- `User`: guarda los datos del usuario y sus relaciones con peliculas creadas y elementos de watchlist
- `Movie`: representa cada pelicula y `createdBy` guarda el UUID del usuario creador
- `watchlistItem`: funciona como tabla intermedia entre `User` y `Movie`, y ademas guarda `status`, `rating` y `notes`
- `WATCHLIST_STATUS`: evita escribir estados libres como texto
- `@@unique([userId, movieId])`: impide que un mismo usuario repita la misma pelicula dentro de su watchlist

### Comentarios utiles

- `createdAt` con `@default(now())` guarda la fecha automaticamente al crear el registro
- `updatedAt` con `@updatedAt` se actualiza solo cada vez que modificas ese item
- `String[]` en `genres` aprovecha que PostgreSQL soporta arrays de texto
- `onDelete: Cascade` hace que si se borra un usuario, tambien se borren sus elementos de watchlist relacionados
- en este proyecto los IDs son `UUID`, no enteros autoincrementales
- `createdBy` guarda el UUID del usuario creador y se relaciona con `User.id`

## Importante si cambias de `Int` a `UUID`

Este cambio si afecta la base de datos.

Si antes tenias algo como:

```prisma
id Int @id @default(autoincrement())
```

y lo cambias a:

```prisma
id String @id @default(uuid())
```

entonces necesitas aplicar una migracion o hacer reset de la base de datos en desarrollo.

Lo normal seria ejecutar:

```bash
npx prisma migrate dev --name use-uuid-ids
```

Este comando:

- crea una nueva migracion con el nombre `use-uuid-ids`
- aplica esa migracion en tu base de datos de desarrollo
- actualiza el historial dentro de `prisma/migrations`
- regenera Prisma Client si hace falta
- deja el proyecto alineado con el nuevo esquema

Si la base de datos es solo de pruebas y no te importa resetearla:

```bash
npx prisma migrate reset
```

Este comando:

- borra la base de datos de desarrollo
- vuelve a crear todas las tablas desde cero
- aplica todas las migraciones existentes
- puede volver a ejecutar el seed si lo tienes configurado

Despues de eso, Prisma volvera a generar registros con IDs tipo UUID.

## `autoincrement()` o `uuid()` en `User.id`

Las dos opciones son validas. La eleccion depende de como quieras modelar tu proyecto.

### Opcion 1: `autoincrement()`

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Esto genera IDs como:

```text
1
2
3
4
```

Suele convenir cuando:

- estas aprendiendo o empezando con Prisma
- quieres un esquema mas simple de leer
- tu proyecto es pequeno o de practica
- no te importa que los IDs sean consecutivos

### Opcion 2: `uuid()`

```prisma
model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
}
```

Esto genera IDs como:

```text
bed29a3e-8386-4506-b44b-8fd7fb886c23
ce304397-4b03-4572-b45f-4c7220e61cbc
```

Suele convenir cuando:

- quieres IDs menos predecibles
- vas a exponer IDs en APIs o tokens
- quieres un estilo mas cercano a proyectos reales modernos
- prefieres que todas las relaciones usen `String` en lugar de `Int`

### Regla practica para elegir

- usa `autoincrement()` si quieres simplicidad y estas aprendiendo
- usa `uuid()` si quieres un modelo mas profesional y menos predecible

En este proyecto actual se ha elegido `uuid()`.

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

### TypeORM

- muy usado en proyectos Node.js con TypeScript
- compatible con PostgreSQL, MySQL, SQLite y mas
- soporta Active Record y Data Mapper
- muy comun en proyectos con NestJS

### Drizzle ORM

- ORM moderno y ligero
- muy centrado en TypeScript
- tipado fuerte y consultas bastante explicitas
- buena opcion si quieres mas control y menos abstraccion



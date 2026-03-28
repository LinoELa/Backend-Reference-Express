# Seed File

## Que es un seed file

Un seed file sirve para insertar datos de prueba en la base de datos.

En este proyecto el seed actual se usa para crear peliculas de ejemplo y relacionarlas con un usuario ya existente.

El archivo es [`movieSeeds.js`](../../prisma/seed/movieSeeds.js).

## Que hace este seed

Este seed:

- usa un `userId` manual
- comprueba si ese usuario existe en la base de datos
- crea varias peliculas de ejemplo
- guarda ese `userId` dentro de `createdBy`

## Por que necesita un `userId`

Ahora mismo el modelo `Movie` guarda quien creo la pelicula con este campo:

```prisma
createdBy String @db.Uuid
```

Y esa relacion apunta al `id` del usuario:

```prisma
creator User @relation("MovieCreator", fields: [createdBy], references: [id], onDelete: Cascade)
```

Por eso no puedes crear peliculas si el `userId` no existe antes en la tabla `User`.

## De donde sacar el `userId`

Puedes sacar el UUID del usuario desde:

- la respuesta de `register`
- la respuesta de `login`
- Prisma Studio
- Postman
- DBeaver

Ejemplo:

```json
{
  "message": "Login exitoso",
  "data": {
    "id": "ce304397-4b03-4572-b45f-4c7220e61cbc",
    "email": "tarantino@gmail.com"
  }
}
```

Ese valor se copia en el seed:

```javascript
const userId = "ce304397-4b03-4572-b45f-4c7220e61cbc";
```

## Estructura basica del seed

```javascript
const userId = "ce304397-4b03-4572-b45f-4c7220e61cbc";

const movieSeeds = [
  {
    title: "Silent Shadow",
    createdBy: userId,
  },
];
```

Cada pelicula usa el mismo `userId` como creador.

## Validacion importante

Antes de insertar peliculas, el seed comprueba que el usuario exista:

```javascript
const existingUser = await prisma.user.findUnique({
  where: { id: userId },
});
```

Si ese usuario no existe, el seed lanza un error claro.

Eso evita guardar peliculas con un `createdBy` invalido.

## Como ejecutar el seed

En este proyecto puedes usar:

```bash
npm run seed:movies
```

Ese script ejecuta el archivo de peliculas.

## Cuando usar este seed

Te sirve cuando:

- ya tienes al menos un usuario creado
- quieres poblar rapido la tabla `Movie`
- necesitas datos de prueba para Postman o frontend

## Idea importante

Este seed actual no crea usuarios.

Primero debes tener un usuario registrado en la base de datos y despues copiar su UUID dentro de `userId`.

Luego ya puedes sembrar peliculas relacionadas con ese usuario.



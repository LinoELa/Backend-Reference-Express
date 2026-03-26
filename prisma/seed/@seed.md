# @seed

Esta carpeta guarda los archivos de seeding del proyecto.

El objetivo del seed es insertar datos de prueba en la base de datos para trabajar mas rapido en desarrollo.

## Archivos actuales

- `userSeed.js`: crea usuarios base
- `movieSeeds.js`: crea peliculas de ejemplo

## Que hace `userSeed.js`

Este archivo:

- crea usuarios como `Root`, `Admin`, `Lucia`, `Mateo` y `Sofia`
- hashea la password con `bcryptjs`
- usa `upsert` para no duplicar usuarios por `email`

Script:

```bash
npm run seed:users
```

## Que hace `movieSeeds.js`

Este archivo:

- usa un `userId` manual
- comprueba si ese usuario existe
- crea peliculas de ejemplo
- guarda ese `userId` dentro de `createdBy`

Script:

```bash
npm run seed:movies
```

## Idea importante

El flujo recomendado es:

1. ejecutar primero el seed de usuarios
2. copiar un `userId` real
3. pegar ese `UUID` dentro de `movieSeeds.js`
4. ejecutar el seed de peliculas

## Scripts actuales

```bash
npm run seed:users
npm run seed:movies
```

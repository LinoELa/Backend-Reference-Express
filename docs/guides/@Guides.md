# @Guides

Esta carpeta guarda documentacion **guiada y secuencial** del proyecto.

La idea de `Guides` es contar el recorrido de construccion del backend por bloques ordenados.

## Para que sirve esta carpeta

Esta carpeta sirve para guardar documentos que explican:

- como se fue montando el proyecto
- que se hizo en cada fase
- que piezas se agregaron en cada bloque
- como entender el flujo paso a paso

## Que tipo de archivos van aqui

Aqui encajan archivos como:

- guias numeradas `01`, `02`, `03`
- pasos de construccion del backend
- documentos de aprendizaje por fase
- tutoriales internos del proyecto
- explicaciones largas de una parte concreta del flujo

## Que archivos NO van aqui

No deberian ir aqui:

- reglas generales del proyecto
- documentos de consulta rapida
- documentos de arquitectura principal

Esos documentos encajan mejor en:

- `Docs/Reference/`
- `Docs/Architecture/`

## Archivos actuales de esta carpeta

- [`01-setup-nodejs-server.md`](./01-setup-nodejs-server.md)
- [`02-database-and-routers.md`](./02-database-and-routers.md)
- [`03-postgresql-prisma.md`](./03-postgresql-prisma.md)
- [`04-jwt-authentication.md`](./04-jwt-authentication.md)
- [`05-seed-file.md`](./05-seed-file.md)
- [`06-watchlist-routes-and-controllers.md`](./06-watchlist-routes-and-controllers.md)
- [`07-middleware.md`](./07-middleware.md)
- [`08-validations.md`](./08-validations.md)
- [`09-movie-controllers-and-get.md`](./09-movie-controllers-and-get.md)

## Como se usa esta carpeta

La carpeta `Guides` se usa cuando quieres seguir el proyecto en orden.

Ejemplos:

- si quieres ver como se levanto el servidor desde cero, vas al `01`
- si quieres seguir el flujo de auth, prisma o watchlist paso a paso, vas a la guia correspondiente
- si alguien nuevo entra al proyecto, `Guides` le enseña la historia del backend

## Regla practica

Si un documento:

- pertenece a una fase concreta
- tiene sentido leerse en orden
- explica como construir o entender una parte paso a paso

entonces probablemente debe vivir en `Docs/Guides/`.

## Idea principal

`Guides` es la carpeta narrativa del proyecto.

Cuenta el recorrido del backend.
No es la carpeta de consulta rapida como `Reference`.
No es la carpeta de reglas estructurales como `Architecture`.

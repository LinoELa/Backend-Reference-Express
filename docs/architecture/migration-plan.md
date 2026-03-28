# Evolucion de estructura

Este archivo describe como puede evolucionar el proyecto desde una version mas simple hacia una version mas completa.

## Etapa 1

Version actual recomendada:

- slices por feature
- `domain`
- `application`
- `infrastructure`
- `shared`
- `prisma`

## Etapa 2

Cuando el proyecto crezca, puedes separar mejor:

- `persistence`
- `security`
- `validation`
- `http/controllers`

## Etapa 3

Si aparecen mas modulos, la estructura puede crecer con:

- `reviews`
- `favorites`
- `recommendations`
- `notifications`

## Regla de evolucion

No crecer por moda.

Solo añade carpetas nuevas cuando aporten claridad real.

## Objetivo

La evolucion debe mantener siempre estas tres ideas:

- Hexagonal
- Vertical Slicing
- Screaming Architecture

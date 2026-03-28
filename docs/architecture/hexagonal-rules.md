# Reglas practicas

Este archivo resume las reglas practicas de la arquitectura hexagonal + vertical slicing + screaming para este proyecto.

## Regla 1

El proyecto debe gritar negocio:

- `auth`
- `movies`
- `watchlist`

## Regla 2

Cada modulo debe repetir la misma forma:

```text
feature/
|-- domain/
|-- application/
`-- infrastructure/
```

## Regla 3

`domain` no debe depender de:

- Express
- Prisma
- JWT
- bcrypt

## Regla 4

`application` contiene casos de uso y habla con puertos del dominio.

## Regla 5

`infrastructure` implementa lo tecnico:

- Prisma repositories
- JWT services
- bcrypt services
- routes
- controllers
- validation schemas

## Regla 6

Los controllers no deben meter la logica fuerte del negocio.

Su trabajo es:

- leer `req`
- llamar al caso de uso
- devolver `res`

## Regla 7

Prisma vive como detalle de infraestructura, no como centro del sistema.

## Regla 8

Si una pieza es transversal, va a `shared/`.

Ejemplos:

- `AppError`
- `authMiddleware`
- `validateRequest`
- `prismaClient`

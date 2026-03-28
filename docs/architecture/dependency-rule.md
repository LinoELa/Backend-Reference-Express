# Quien puede depender de quien

Este archivo deja clara la regla de dependencias para no romper la arquitectura.

## Regla principal

La dependencia siempre debe apuntar hacia adentro.

```text
infrastructure -> application -> domain
```

## Domain

`domain` no conoce:

- Express
- Prisma
- JWT
- bcrypt
- Zod

`domain` solo define:

- entidades
- reglas del negocio
- puertos

## Application

`application` puede conocer:

- entidades del dominio
- puertos del dominio
- errores del dominio

`application` no debe conocer implementaciones concretas de Prisma o Express.

## Infrastructure

`infrastructure` si puede conocer:

- Prisma
- Express
- JWT
- bcrypt
- Zod
- middlewares

porque su trabajo es implementar detalles tecnicos.

## Ejemplo valido

```text
LoginUserUseCase
  -> AuthRepository
  -> PasswordHasher
  -> TokenService
```

Y luego:

```text
PrismaAuthRepository implements AuthRepository
BcryptPasswordHasher implements PasswordHasher
JwtTokenService implements TokenService
```

## Ejemplo no valido

Esto estaria mal:

```text
LoginUserUseCase -> PrismaClient
```

porque el caso de uso ya estaria dependiendo directamente del detalle tecnico.

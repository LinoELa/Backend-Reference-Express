# Documento complementario de auditoria/mapeo

Este archivo sirve como complemento del documento principal de arquitectura.

Aqui se puede documentar:

- estado actual del repo
- estructura vieja
- estructura nueva
- mapeo de archivos
- decisiones de reorganizacion

## Uso recomendado

Usa este archivo cuando quieras responder preguntas como:

- que parte del repo sigue en estructura antigua
- que modulo ya esta migrado
- que archivo viejo corresponde a que archivo nuevo

## Ejemplo de mapeo

```text
src/routers/authRouters.js
  -> src/modules/auth/infrastructure/http/authRoutes.js

src/controllers/movie/addMovieController.js
  -> src/modules/movies/infrastructure/http/controllers/CreateMoviePostController.js

src/middlewares/authMiddleware.js
  -> src/shared/middlewares/authMiddleware.js
```

## Idea principal

Este archivo no define la arquitectura.

Este archivo ayuda a:

- auditar
- comparar
- migrar
- mantener trazabilidad

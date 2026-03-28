# @Reference

Esta carpeta guarda documentacion de **consulta rapida** del proyecto.

La idea de `Reference` no es explicar una fase paso a paso, sino dejar archivos que sirvan como apoyo constante mientras trabajas en el repo.

## Para que sirve esta carpeta

Esta carpeta sirve para guardar documentos que responden preguntas como:

- que reglas internas seguimos
- que significan ciertos codigos o convenciones
- como trabajamos con Git
- que significa `preparar todo`
- que informacion conviene tener a mano sin buscarla en varios sitios

## Que tipo de archivos van aqui

Aqui encajan archivos como:

- workflow de Git
- referencia de codigos HTTP
- reglas internas del proyecto
- checklists de trabajo
- convenciones de nombres
- estructura de comentarios
- documentos cortos de apoyo tecnico

## Que archivos NO van aqui

No deberian ir aqui:

- guias numeradas del proyecto tipo `01`, `02`, `03`
- documentos de arquitectura principal
- tutoriales largos de una feature concreta

Esos documentos encajan mejor en:

- `Docs/Project/`
- `Docs/Architecture/`

## Archivos actuales de esta carpeta

- [`github-workflow.md`](./github-workflow.md): flujo de trabajo con Git y ramas
- [`http-status.md`](./http-status.md): codigos HTTP mas usados en la API
- [`preparar-todo.md`](./preparar-todo.md): regla interna para revisar bloques completos
- [`nomenclatura.md`](./nomenclatura.md): reglas de nombres para carpetas, archivos y modulos

## Como se usa esta carpeta

La carpeta `Reference` se usa como apoyo diario.

Ejemplos:

- si dudas que codigo HTTP devolver, miras `http-status.md`
- si dudas como cerrar un bloque del proyecto, miras `preparar-todo.md`
- si dudas sobre ramas, commits o flujo de trabajo, miras `github-workflow.md`

## Regla practica

Si un documento:

- no pertenece a una fase numerada
- no define la arquitectura principal
- y sirve como referencia reutilizable

entonces probablemente debe vivir en `Docs/Reference/`.

## Idea principal

`Reference` es la carpeta de apoyo del proyecto.

No cuenta la historia del proyecto como `Project`.
No define la estructura del sistema como `Architecture`.

Su trabajo es ser una base de consulta rapida, clara y reutilizable.

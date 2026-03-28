# @Architecture

Esta carpeta guarda la documentacion de **estructura y reglas tecnicas** del proyecto.

La idea de `Architecture` es definir como debe estar organizado el backend y que normas debe respetar esa organizacion.

## Para que sirve esta carpeta

Esta carpeta sirve para documentar:

- la arquitectura principal del sistema
- las reglas de dependencias
- las reglas practicas del proyecto
- el mapeo entre estructura vieja y nueva
- la evolucion de la estructura cuando el proyecto crece

## Que tipo de archivos van aqui

Aqui encajan archivos como:

- arquitectura hexagonal
- reglas de capas o slices
- dependency rule
- auditoria y mapeo de archivos
- planes de migracion de estructura
- decisiones de organizacion del repo

## Que archivos NO van aqui

No deberian ir aqui:

- guias numeradas paso a paso
- documentos de consulta diaria como Git o HTTP status
- tutoriales de una sola fase

Esos documentos encajan mejor en:

- `Docs/Guides/`
- `Docs/Reference/`

## Archivos actuales de esta carpeta

- [`Arquitectura-Hexagonal.md`](./Arquitectura-Hexagonal.md): documento principal de arquitectura
- [`hexagonal-rules.md`](./hexagonal-rules.md): reglas practicas
- [`dependency-rule.md`](./dependency-rule.md): quien puede depender de quien
- [`audit-and-mapping.md`](./audit-and-mapping.md): documento complementario de auditoria y trazabilidad
- [`migration-plan.md`](./migration-plan.md): evolucion de la estructura

## Como se usa esta carpeta

La carpeta `Architecture` se usa cuando necesitas decidir o revisar:

- donde debe vivir un archivo nuevo
- que dependencias son validas
- como organizar un modulo nuevo
- como pasar de una estructura simple a una mas completa

## Regla practica

Si un documento:

- define reglas estructurales
- afecta a todo el proyecto
- ayuda a mantener la arquitectura coherente

entonces probablemente debe vivir en `Docs/Architecture/`.

## Idea principal

`Architecture` es la carpeta de reglas del sistema.

No cuenta la historia paso a paso como `Guides`.
No actua como base de consulta rapida como `Reference`.

Su trabajo es dejar claro como debe estar construido el proyecto y como debe crecer sin perder orden.

# Tips Importantes Express y Muchoas librerias de NodeJS

<!-- =========================================================================== -->


## Node Js 

Inicializar un proyecto de Node.js es un proceso sencillo que se puede hacer utilizando npm (Node Package Manager). :

```bash
npm init -y

```

<!-- =========================================================================== -->

# 1. Express
Express es un framework de Node.js que facilita la creación de aplicaciones web y APIs. Proporcion

### Importante

Las secciones `dependencies` y `devDependencies` normalmente no se escriben a mano.

Se generan automáticamente al instalar paquetes con npm.

```bash
npm install express
```
<!-- =========================================================================== -->


## 2 src 
Es donde casi semaneja noto todo el codigo fuente de la aplicacion, es decir, los controladores, modelos, rutas, etc.º

<!-- =========================================================================== -->

## 3. nodemon
Es una herramienta que se utiliza para el desarrollo de aplicaciones Node.js. Permite reiniciar automáticamente la aplicación cada vez que se detecta un cambio en los archivos del proyecto, lo que facilita el proceso de desarrollo y prueba.
Para usar nodemon, primero debes instalarlo globalmente en tu sistema utilizando npm:

```bash
npm i  nodemon --save-dev
```
Luego, en lugar de ejecutar tu aplicación con el comando `node`, puedes usar `nodemon` seguido del nombre de tu archivo principal. Por ejemplo:

```bash
nodemon app.js
``` 

- En package.json puedes agregar un script para ejecutar nodemon de manera más sencilla:

```json 
"scripts": {
  "start": "nodemon server.js",
  "dev": "nodemon src/server.js"
}
```

<!-- =========================================================================== -->

## 4. package.json

El archivo `package.json` es un archivo de configuración usado en proyectos Node.js. Sirve para definir información del proyecto, dependencias, scripts y otras opciones necesarias para su ejecución.

Entre otras cosas, permite:

(1) indicar el nombre y la versión del proyecto
(2) gestionar dependencias y dependencias de desarrollo
(3) definir scripts para automatizar tareas
(4) configurar el tipo de módulos que usa Node.js

En este caso, necesitas dos scripts:

(1) `dev`: para ejecutar el proyecto en desarrollo con `nodemon`
(2) `start`: para ejecutar el proyecto en producción con `node`

Ejemplo:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

<!-- =========================================================================== -->

## 5. Importar y exportar en Node.js

En Node.js se pueden usar dos sistemas de módulos:

(1) **CommonJS**, con `require` y `module.exports`
(2) **ES Modules**, con `import` y `export`

### 5.1 Importar con ES Modules

```javascript
import express from 'express';
```

Para poder usar esta sintaxis, debes indicar en `package.json` que el proyecto trabajará con módulos ES. Para eso, añade:

```json
{
  "type": "module"
}
```

### 5.2 CommonJS

Sintaxis tradicional de Node.js:

```javascript
const express = require('express');

// Exportar
module.exports = function () {
  console.log("Hola desde CommonJS");
};
```

### 5.3 ES Modules

Una vez añadido `"type": "module"` en `package.json`, ya puedes usar `import` y `export`.

### Exportar

```javascript
export function saludar() {
  console.log("Hola desde ES Modules");
}
```

### Importar

```javascript
import { saludar } from './archivo.js';

saludar();
```

## Resumen

Si usas `import` y `export`, en `package.json` debes poner:

```json
"type": "module"
```

Si no lo haces, Node.js interpretará el proyecto con CommonJS por defecto.

Si quieres, te lo puedo dejar ya con formato de apuntes para entregar en clase.

<!-- =========================================================================== -->



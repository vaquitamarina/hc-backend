# Informe de Entregables - Historias de Usuario (HU01, HU02, HU04)

Este README contiene la Tabla de Vinculación Arquitectónica y las instrucciones para reproducir las pruebas BDD.

**Tabla de Vinculación Arquitectónica**

| Historia (HU)                 |                         Archivo .feature | Ruta / Endpoint                | Controlador                  | Método del controlador | Modelo / Función                                         | Step definitions / Tests                   |
| ----------------------------- | ---------------------------------------: | ------------------------------ | ---------------------------- | ---------------------- | -------------------------------------------------------- | ------------------------------------------ |
| HU01 - Registro HC            |         `features/HU01_registro.feature` | `POST /api/hc` (ej.)           | `HcController.registerHc`    | `registerHc`           | `HcModel.registerHc`                                     | `step-definitions/historia.steps.js`       |
| HU02 - Obtener/Crear Borrador |         `features/HU02_borrador.feature` | `POST /api/hc/draft`           | `HcController.createDraft`   | `createDraft`          | `HcModel.createDraft / fn_obtener_o_crear_borrador`      | `step-definitions/historia_extra.steps.js` |
| HU04 - Asignar Paciente       | `features/HU04_asignar_paciente.feature` | `PATCH /api/hc/assign-patient` | `HcController.assignPatient` | `assignPatient`        | `HcModel.assignPatient / fn_asignar_paciente_a_historia` | `step-definitions/historia_extra.steps.js` |

Notas:

- Las rutas indicadas son referenciales según la arquitectura del proyecto; consulte `controllers/hc/hcController.js` para los métodos reales.
- Las funciones en la base de datos se mencionan en `FLUJO_BORRADOR.md` y `endpoints.md`.

## Ejecutar pruebas BDD localmente

Instalar dependencias (si no están instaladas):

```bash
npm install
```

Ejecutar las pruebas BDD (Cucumber):

```bash
npm run test:bdd
```

Generar evidencia: tomar una captura de pantalla de la terminal donde se vea `1 scenario (x passed)` o similar, con al menos 6 escenarios `passed` en total.

# 📌 Proyecto Backend – Sistema de Gestión de Historias Clínicas

Este repositorio contiene el **backend** del sistema de gestión de historias clínicas.  
Está construido con **Node.js + Express** bajo una arquitectura organizada en capas.

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js versión 22.19.0 o superior
- npm versión 9 o superior (incluido con Node.js)
- Git

---

# 📌 Convención de Respuestas API (GET & POST)

## 🔹 GET (obtener datos)

| Escenario                       | Código HTTP     | Respuesta JSON                                 |
| ------------------------------- | --------------- | ---------------------------------------------- |
| ✅ Con resultados (lista)       | `200 OK`        | `[ { "id": 1, "nombre": "Paciente Adulto" } ]` |
| ✅ Con resultado (recurso)      | `200 OK`        | `{ "id": 1, "nombre": "Paciente Adulto" }`     |
| ✅ Sin resultados (lista vacía) | `200 OK`        | `[]`                                           |
| ❌ Recurso no encontrado        | `404 Not Found` | `{ "error": "Recurso no encontrado" }`         |

---

## 🔹 POST (crear recurso o acción, ej: registro/login)

| Escenario                         | Código HTTP                 | Respuesta JSON                               |
| --------------------------------- | --------------------------- | -------------------------------------------- |
| ✅ Creación exitosa               | `201 Created`               | `{ "id": 101, "nombre": "Juan Pérez" }`      |
| ✅ Acción exitosa (ej: login)     | `200 OK`                    | `{"id": 101, "nombre": "Juan Pérez" }`       |
| ❌ Datos inválidos / conflicto    | `400 Bad Request`           | `{ "error": "El email ya está registrado" }` |
| ❌ Usuario no encontrado (login)  | `404 Not Found`             | `{ "error": "Usuario no encontrado" }`       |
| ❌ Credenciales inválidas (login) | `401 Unauthorized`          | `{ "error": "Credenciales inválidas" }`      |
| ❌ Error interno                  | `500 Internal Server Error` | `{ "error": "Ocurrió un error inesperado" }` |

## 📂 Estructura del proyecto

### 📁 Descripción de carpetas y archivos

- **data/**  
  Mockups o datos temporales para pruebas.  
  Ejemplo: `users.json`.

- **controllers/**  
  Contienen la lógica de negocio para cada recurso de la API.  
  Ejemplo: `userController.js`.

- **middlewares/**  
  Funciones intermedias para validación, manejo de errores, autenticación, etc.  
  Ejemplo: `errorHandler.js`, `authMiddleware.js`.

- **models/**  
  Definen la estructura de los datos (más adelante conectados a una base de datos).  
  Ejemplo: `userModel.js`.

- **routes/**  
  Definen las rutas y endpoints de la API, vinculando con los controladores.  
  Ejemplo: `userRoutes.js`.

- **utils/**  
  Funciones auxiliares reutilizables.  
  Ejemplo: `logger.js`, `readJSON.js`.

- **api.js**  
  Punto de entrada de la aplicación Express. Configura middlewares globales, rutas y levanta el servidor en el puerto **3000**.

- **.gitignore**  
  Archivos y carpetas ignorados en el repositorio (`node_modules`, `.env`).

- **package.json**  
  Define dependencias, scripts y configuración básica del proyecto.

- **package-lock.json**  
  Guarda las versiones exactas de las dependencias instaladas.

---

## ⚡ Instalación y uso

1. **Clonar el repositorio**  
   `git clone <url-del-repo>`
   `cd hc-backend`

2. **Instalar dependencias**
   `npm install`

3. **Levantar el servidor en desarrollo**
   `npm run dev`
   El backend quedara disponible en localhost:3000/api, por ahora funciona el localhost:3000/api/users

---

## 🏗️ Flujo de Trabajo con Git

El flujo de trabajo del proyecto se basa en el uso de ramas para cada nueva tarea, ya sea una funcionalidad, un componente o un arreglo. Esto nos permite trabajar de forma paralela sin interferir en el trabajo de los demás.

**Pasos:**

1.  **Crear una nueva rama**: Antes de empezar a trabajar en una tarea, crea una rama específica desde la rama principal (`main` o `develop`).

    ```bash
    git checkout -b nombre-de-la-rama
    ```

2.  **Realizar commits**: A medida que trabajas, haz `commits` en esta nueva rama para guardar tus cambios. Utiliza mensajes de `commit` descriptivos.

    ```bash
    git commit -m "add new user"
    ```

3.  **Subir la rama**: Una vez que hayas terminado la tarea, sube tu rama al repositorio remoto para que otros la puedan ver y revisar.
    ```bash
    git push origin nombre-de-la-rama
    ```

---

## 🏷️ Convención de Nombres para Ramas

Para mantener la coherencia y la claridad, usaremos una convención de nombres para las ramas. El formato es `<tipo>/<descripcion-de-la-tarea>`.

**Tipos de ramas comunes:**

- `feat`: Para una **nueva funcionalidad** o característica.
  - **Ejemplo:** `feat/add-contact-form`
- `fix`: Para una **corrección de errores** (bug fix).
  - **Ejemplo:** `fix/correct-email-validation`
- `docs`: Para cambios en la **documentación**.
  - **Ejemplo:** `docs/update-readme`
- `refactor`: Para **refactorización** de código que no cambia la funcionalidad.
  - **Ejemplo:** `refactor/improve-button-structure`
- `chore`: Para tareas de **mantenimiento** o configuración del proyecto.
  - **Ejemplo:** `chore/update-dependencies`
- `test`: Para añadir o modificar **pruebas**.
  - **Ejemplo:** `test/add-login-unit-tests`

**Consideraciones adicionales:**

- **Minúsculas**: Usa solo letras minúsculas.
- **Guiones**: Separa las palabras con guiones (`-`).
- **Sé descriptivo**: La descripción debe ser lo suficientemente clara para que, con solo leer el nombre de la rama, se entienda de qué trata la tarea.

---

## 📖 Convenciones

### **📋 Convenciones de Nomenclatura para Front-end**

Para mantener un código limpio y consistente, seguiremos las siguientes convenciones de nomenclatura para el desarrollo del front-end.

#### **1. Nomenclatura en JavaScript**

- **Variables**: Las variables se declararán utilizando **camelCase**.
  - **Ejemplo**: `vaquitaMarina`
- **Clases**: Los nombres de las clases se escribirán en **PascalCase**.
  - **Ejemplo**: `UserModel`

---

#### **4. Convención de Idioma**

- Todos los nombres de variables y clases se escribirán en **inglés** para mantener una convención global y evitar ambigüedades.
  - **Ejemplo**: Usa `userModel` en lugar de `modeloDeUsuario`.

---

## Notas

- El repo tiene autoformteo y linteo ya configurado, se activa al momento de

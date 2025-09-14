# 📌 Proyecto Backend – Sistema de Gestión de Historias Clínicas

Este repositorio contiene el **backend** del sistema de gestión de historias clínicas.  
Está construido con **Node.js + Express** bajo una arquitectura organizada en capas.

---

## 🚀 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js versión 22.19.0 o superior
- npm versión 9 o superior (incluido con Node.js)
- Git

---

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

## 📌 Flujo de Git: Ship / Show / Ask

Usaremos la metodología **Ship/Show/Ask** para gestionar commits:

### 🔹 Ship

- Para cambios pequeños, simples y sin riesgo.
- Se comitea directamente en la rama `main`.

**Ejemplo:**
[SHIP]: fix typo in login validation

### 🔹 Show

- Para cambios medianos que pueden necesitar revisión ligera.
- Se trabaja en una rama nueva y se comparte con el equipo para feedback.

**Ejemplo:**
[SHOW]: add user profile card component

### 🔹 Ask

- Para cambios grandes, con riesgo o que afectan partes críticas.
- Se debe abrir un Pull Request y solicitar revisión antes de fusionar.

**Ejemplo:**
[ASK]: refactor authentication flow

---

## 🌱 Guía de Ramas en Git

Para mantener un flujo de trabajo organizado usaremos ramas según la metodología **Ship / Show / Ask**.

---

### 🔹 Crear una rama nueva

Siempre empieza desde `main` actualizado:

`git checkout main`
`git pull`
`git checkout -b nombre-de-la-rama`

Ejemplo: `git checkout -b feature/button-component`

---

### 🔹 Subir la rama al remoto (GitHub)

`git push origin nombre-de-la-rama`
Ejemplo: `git push origin feature/button-component`

---

### 📌 Convenciones de nombres de ramas

- `feature/...` → nuevas funcionalidades
- `fix/...` → correcciones de errores
- `docs/...` → documentación
- `chore/...` → tareas de configuración o mantenimiento

---

## 📌 Flujo de Git: Ship / Show / Ask

Usaremos la metodología **Ship/Show/Ask** para gestionar commits:

### 🔹 Ship

- Para cambios pequeños, simples y sin riesgo.
- Se comitea directamente en la rama `main`.

**Ejemplo:**
[SHIP]: fix typo in login validation

### 🔹 Show

- Para cambios medianos que pueden necesitar revisión ligera.
- Se trabaja en una rama nueva y se comparte con el equipo para feedback.

**Ejemplo:**
[SHOW]: add user profile card component

### 🔹 Ask

- Para cambios grandes, con riesgo o que afectan partes críticas.
- Se debe abrir un Pull Request y solicitar revisión antes de fusionar.

**Ejemplo:**
[ASK]: refactor authentication flow

---

## 🌱 Guía de Ramas en Git

Para mantener un flujo de trabajo organizado usaremos ramas según la metodología **Ship / Show / Ask**.

---

### 🔹 Crear una rama nueva

Siempre empieza desde `main` actualizado:

`git checkout main`
`git pull`
`git checkout -b nombre-de-la-rama`

Ejemplo: `git checkout -b feature/button-component`

---

### 🔹 Subir la rama al remoto (GitHub)

`git push origin nombre-de-la-rama`
Ejemplo: `git push origin feature/button-component`

---

### 📌 Convenciones de nombres de ramas

- `feature/...` → nuevas funcionalidades
- `fix/...` → correcciones de errores
- `docs/...` → documentación
- `chore/...` → tareas de configuración o mantenimiento

---

## 📖 Convenciones

- Código en **JavaScript**
- Todo en camelCase en inglés (variables, funciones, archivos)
- Controladores, middlewares, modelos y utilidades bien separados en sus carpetas

## Notas

- Por ahora se usan mockups (JSON en /data) en lugar de base de datos.
- Autoformateo y linteo se ejecutan al hacer commit

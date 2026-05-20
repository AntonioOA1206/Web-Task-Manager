# Web-Task-Manager

Aplicación web de gestión de tareas desarrollada con **FastAPI**, **JavaScript**, **HTML** y **CSS**.

---

# ¿Qué hace este proyecto?

La aplicación permite:

- Crear tareas
- Mover tareas entre columnas usando drag & drop
- Guardar automáticamente el estado de las tareas
- Eliminar tareas individuales
- Eliminar todas las tareas
- Mantener las tareas guardadas en un fichero JSON incluso al reiniciar la aplicación

Las tareas se organizan en tres estados:

- Por hacer
- En progreso
- Terminada

---

# Tecnologías utilizadas

- Python
- FastAPI
- Uvicorn
- JavaScript
- HTML5
- CSS
- JSON

---

# Prerrequisitos

Antes de ejecutar el proyecto necesitas tener instalado:

## 1. Python

Descargar desde:

https://www.python.org/downloads/

Comprobar instalación:

```bash
python --version
```

---

## 2. FastAPI y Uvicorn

Instalar desde terminal:

```bash
pip install fastapi uvicorn
```

---

# Cómo ejecutar el proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/AntonioOA1206/Web-Task-Manager
```

---

## 2. Entrar en la carpeta del proyecto

```bash
cd  Web-Task-Manager
```

---

## 3. Ejecutar el servidor

```bash
python -m uvicorn backend.app:app --reload
```

o

```bash
python3 -m uvicorn backend.app:app --reload
```
---

# Cómo acceder a la web

Abrir en el navegador:

```text
http://127.0.0.1:8000
```

o

```text
http://localhost:8000
```

---

# Cómo usar la web

## Crear tarea

1. Escribir texto en el input
2. Pulsar el botón "Enviar"

---

## Mover tarea

- Arrastrar la tarea a otra columna

El cambio se guarda automáticamente en el backend.

---

## Seleccionar tarea

- Hacer click sobre una tarea

La tarea seleccionada quedará resaltada.

---

## Eliminar una tarea

1. Seleccionar una tarea
2. Pulsar "Eliminar tarea"

---

## Eliminar todas las tareas

- Pulsar "Eliminar todas las tareas"

---

# Estructura del proyecto

```text
Lista tareas/
│
├── backend/
│   ├── app.py
│   └── tareas.json
│
├── frontend/
│   ├── index.html
│   ├── mystyle.css
│   └── scripts.js
│
├── multimedia/
│   └── favicon.ico
│
└── .gitignore
```

---

# Objetivos del proyecto

Este proyecto fue creado con el objetivo de practicar:

- Desarrollo frontend y backend separados
- APIs REST con FastAPI
- Manipulación del DOM con JavaScript
- Drag & Drop
- Persistencia de datos usando JSON
- CRUD completo
- Organización de proyectos web

---

# Posibles mejoras futuras

- Sistema de usuarios
- Edición de tareas
- Diseño responsive para móviles

---

# Notas

- El proyecto utiliza un fichero JSON como almacenamiento simple.
- No utiliza base de datos externa.
- El objetivo principal es educativo y de práctica básica.
- Se incluye el fichero con 3 "tareas" para mostrar como se ven la primera vez que se inicie la web.


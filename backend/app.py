import os
import json
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

#Nos quedamos con la ruta absoluta de la carpeta donde se esta app.py, es decir, backend
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

#Nos quedamos con la ruta absoluta de la carpeta frontend (saliendo de la del backend)
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

#Nos quedamos con la carpeta de multimedia (saliendo desde backend)
MULTIMEDIA_DIR = os.path.join(BASE_DIR, "..", "multimedia")

#La ruta absoluta del dichero JSON
FICHERO = f"{BASE_DIR}/tareas.json"

#Crear la app
app = FastAPI()

# Permite acceder desde el navegador a los archivos de frontend y multimedia usando las rutas /static y /media
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")
app.mount("/media", StaticFiles(directory=MULTIMEDIA_DIR), name="media")

# -----------------------------
# MODELO DE TAREA
# -----------------------------
class Tarea(BaseModel):
    descripcion: str
    estado: str

# Comprueba si el fichero existe y si no existe lo crea vacio
if not os.path.exists(FICHERO):
    with open(FICHERO, "w", encoding="utf-8") as f:
        json.dump([], f)

# -----------------------------
# LEER TAREAS
# -----------------------------
def leer_tareas():
    with open(FICHERO, "r", encoding="utf-8") as f:
        return json.load(f)
    
# -----------------------------
# GUARDAR TAREAS
# -----------------------------
def guardar_tareas(tareas):
    with open(FICHERO, "w", encoding="utf-8") as f:
        json.dump(tareas, f, indent=4, ensure_ascii=False)

# Mostrar el html cuando se accede a la raiz
@app.get("/")
def root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
    
# -----------------------------
# GET TODAS LAS TAREAS
# -----------------------------
@app.get("/tareas")
def get_tareas():
    return leer_tareas()

# -----------------------------
# POST: CREAR TAREA
# -----------------------------
@app.post("/tareas")
def crear_tarea(tarea: Tarea):
    tareas = leer_tareas()

    nueva_tarea = {
        "id": len(tareas) + 1,
        "descripcion": tarea.descripcion,
        "estado": tarea.estado
    }

    tareas.append(nueva_tarea)
    guardar_tareas(tareas)

    return nueva_tarea

# -----------------------------
# PUT: ACTUALIZAR ESTADO
# -----------------------------
@app.put("/tareas/{tarea_id}")
def actualizar_estado(tarea_id: int, nuevo_estado: str):
    tareas = leer_tareas()

    for t in tareas:
        if t["id"] == tarea_id:
            t["estado"] = nuevo_estado
            break

    guardar_tareas(tareas)
    return {"ok": True}

# -----------------------------------------
# DELETE: BORRAR TAREA POR TAREA
# -----------------------------------------
@app.delete("/tareas/{tarea_id}")
def borrar_tarea(tarea_id: int):
    tareas = leer_tareas()

    tareas = [t for t in tareas if t["id"] != tarea_id]

    guardar_tareas(tareas)

    return {"ok": True}

# -----------------------------------------
# DELETE ALL: BORRAR TODAS LAS TAREAS
# -----------------------------------------
@app.delete("/tareas")
def borrar_todas():
    guardar_tareas([])
    return {"ok": True}
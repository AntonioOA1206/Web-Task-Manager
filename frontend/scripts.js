// Cuando se carga la pagina se leen todas las tareas del JSON y se muestran en su respectiva columna 
window.addEventListener("load", async function () {
    const res = await fetch("/tareas");
    const tareas = await res.json();

    tareas.forEach(tarea => {
        crearTareaEnPantalla(tarea);
        colocarEnColumna(tarea);
    });
});

// Variable que usaremos para seleccionar las tareas para posteriormente borrarlas
let tareaSeleccionada = null;

// Coloca cada tarea dependiendo su estado
function colocarEnColumna(tarea) {
    let elemento = document.getElementById("t" + tarea.id);

    if (!elemento) return;

    if (tarea.estado === "por hacer") {
        document.querySelector("#porHacer").appendChild(elemento);
        elemento.classList.add("porHacer");
    }

    if (tarea.estado === "en progreso") {
        document.querySelector("#enProceso").appendChild(elemento);
        elemento.classList.add("enProceso");
    }

    if (tarea.estado === "terminada") {
        document.querySelector("#terminada").appendChild(elemento);
        elemento.classList.add("terminada");
    }
}

// Nos quedamos con todos los botones
let botones = document.querySelectorAll("button");

// Funcion decorativa para los botones
botones.forEach (boton => {
    boton.addEventListener("mouseenter", function(e) {
        boton.style.color = "blue";
        boton.style.transform = "scale(1.1)";
    });

    boton.addEventListener("mouseleave", function(e) {
        boton.style.color = "black";
        boton.style.transform = "scale(1)";
    });

});

// El input de texto
let input = document.querySelector("#tareaInput");
// El boton para crear las tareas
let botonEnviar = document.querySelector("#botonEnviar");
// Donde esperan las tareas a ser clasificadas segun su estado
let tareaEsperando = document.querySelector("#tarea");

// Funcion que en caso de haber escrito algo en el input lo usa para crear la tarea tanto en el front como en el back
botonEnviar.addEventListener("click", async function(e) {
    let texto = input.value;

    if (texto !== "") {

        const res = await fetch("/tareas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descripcion: texto,
                estado: "por hacer"
            })
        });

        const tarea = await res.json();

        crearTareaEnPantalla(tarea);
    }

    input.value = "";
});

// Funcion que crea las tareas en el front
function crearTareaEnPantalla(tarea) {

    let div = document.createElement("div");

    div.innerText = tarea.descripcion;
    div.classList.add("tareaBase", "esperando");

    div.setAttribute("draggable", "true");
    div.id = "t" + tarea.id;

    div.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("id", div.id);
    });

    document.querySelector("#origen").appendChild(div);

    div.addEventListener("click", function () {
        if (tareaSeleccionada) {
            tareaSeleccionada.classList.remove("seleccionada");
        }

        tareaSeleccionada = div;
        div.classList.add("seleccionada");
    });
}

// Las 3 zonas donde soltaremos las tareas
let zonas = document.querySelectorAll(".zonaSoltar");

/* Le damos el mismo comportamiento a las 3 columnas el cual es:
- Darle el estilo correspondiente a cada tarea segun el estado
- Cambiar su estado en el JSON 
*/
zonas.forEach(zona => {
    zona.addEventListener("dragover", function(e) {
        e.preventDefault()
    });

    zona.addEventListener("drop", async function (e) {

        let id = e.dataTransfer.getData("id");
        let elemento = document.getElementById(id);

        let nuevoEstado = "";

        if (zona.id === "porHacer") nuevoEstado = "por hacer";
        if (zona.id === "enProceso") nuevoEstado = "en progreso";
        if (zona.id === "terminada") nuevoEstado = "terminada";

        zona.appendChild(elemento);

        elemento.classList.remove("esperando", "porHacer", "enProceso", "terminada");
        elemento.classList.add(zona.id);

        let tareaId = parseInt(elemento.id.replace("t", ""));

        await fetch(`/tareas/${tareaId}?nuevo_estado=${nuevoEstado}`, {
            method: "PUT"
        });
    });
});

// El boton para eliminar las tareas
let botonEliminar = document.querySelector("#botonEliminar");

// Funcion para eliminar las tareas seleccionadas
botonEliminar.addEventListener("click", async function () {

    if (!tareaSeleccionada) return;

    let tareaId = parseInt(tareaSeleccionada.id.replace("t", ""));

    await fetch(`/tareas/${tareaId}`, {
        method: "DELETE"
    });

    tareaSeleccionada.remove();
    tareaSeleccionada = null;
});

// Boton para eliminar TODAS las tareas
let botonLimpiar = document.querySelector("#botonLimpiar");

// Funcion que elimina TODAS las tareas dejando el JSON vacio
botonLimpiar.addEventListener("click", async function () {
    
    await fetch("/tareas", {
        method: "DELETE"
    });

    let tareas = document.querySelectorAll(".tareaBase");

    tareas.forEach(tarea => {
        tarea.remove();
    });

    tareaSeleccionada = null;
});


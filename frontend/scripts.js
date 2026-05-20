let botones = document.querySelectorAll("button");

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

let input = document.querySelector("#tareaInput");
let botonEnviar = document.querySelector("#botonEnviar");
let tareaEsperando = document.querySelector("#tarea");
let cont = 0;

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
}

let zonas = document.querySelectorAll(".zonaSoltar");

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

        // mover visualmente
        zona.appendChild(elemento);

        // cambiar clase
        elemento.classList.remove("esperando", "porHacer", "enProceso", "terminada");
        elemento.classList.add(zona.id);

        // id de tarea
        let tareaId = parseInt(elemento.id.replace("t", ""));

        // enviar al backend
        await fetch(`/tareas/${tareaId}?nuevo_estado=${nuevoEstado}`, {
            method: "PUT"
        });
    });
});

let tareaId = parseInt(elemento.id.replace("t", ""));

fetch(`/tareas/${tareaId}?nuevo_estado=${nuevoEstado}`, {
    method: "PUT"
});
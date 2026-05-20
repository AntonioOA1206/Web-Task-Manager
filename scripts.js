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

botonEnviar.addEventListener("click", function(e) {
    let texto = input.value;

    if (texto !== "") {
        let tarea = document.createElement("div");
        tarea.innerText = texto;
        tarea.classList.add("tareaBase", "esperando");
        tarea.setAttribute("draggable", "true");
        tarea.id = "t" + Date.now();

        tarea.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("id", tarea.id);
        });

        document.querySelector("#origen").appendChild(tarea);
    }

    input.value = "";
});

let zonas = document.querySelectorAll(".zonaSoltar");

zonas.forEach(zona => {
    zona.addEventListener("dragover", function(e) {
        e.preventDefault()
    });

    zona.addEventListener("drop", function (e) {
        let id = e.dataTransfer.getData("id");
        let elemento = document.getElementById(id);
        elemento.classList.remove("esperando", "porHacer", "enProceso", "terminada");
        if (zona.id === "porHacer") {
            elemento.classList.add("porHacer");
        }

        if (zona.id === "enProceso") {
            elemento.classList.add("enProceso");
        }

        if (zona.id === "terminada") {
            elemento.classList.add("terminada");
        }
        zona.appendChild(elemento);
    });
});

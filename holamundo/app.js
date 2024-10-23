const{mensaje2}= require("./hola")
console.log("punto de entrada")


const tareas = [
    {
    fecha: "2024-09-23",
    hecho: false
},
{

    nombre: "Ir de compras",
    fecha: "2024-09-24",
    hecho:false
},
{
    nombre: "Estudiar para el examen de Backend",
    fecha: "2024-09-23",
    hecho: false
},
];

const tareasPorRevisar = tareas.filter(tarea => !tarea.hecho);
console.log(tareasPorRevisar);
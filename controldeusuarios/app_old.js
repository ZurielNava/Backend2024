const express = require("express")

const app= express()

app.post("/", (req, res)=>{
    res.status(404).send("Hola desde POST!");
});//POST PARA CREAR UN NUEVO RECURSO

app.get("/", (req, res)=>{
    res.status(404).send("Hola desde GET!");
});//GET OBTENER INFORMACION

app.get("/prueba", (req, res)=>{
    res.status(404).send("Hola desde la ruta PRUEBA!");
});//GET OBTENER INFORMACION

app.put("/", (req, res)=>{
    res.status(404).send("Hola desde PUT!");
});//PUT PARA ACTUALIZAR UN RECURSO COMPLETO

app.patch("/", (req, res)=>{
    res.status(404).send("Hola desde PATCH!");
});//PATCH PARA ACTUALIZAR UN RECURSO PARCIALMENTE

app.delete("/", (req, res)=>{
    res.status(404).send("Hola desde DELETE!");
});//DELETE PARA ELIMINAR UN RECURSO

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});
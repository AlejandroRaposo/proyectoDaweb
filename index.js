/**
 * Tres formas distintas de crear variables en javescript
 * var: Se puede modificar
 * let: Se puede modificar
 * const: Es constanta y no se puede modificar
 */

// Improtamos las librerías necesarías
// Concretamente el framework express
const express = require("express");

// Inicializamos a aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
  });
  

let coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
];


// Lista todos los coches
app.get("/coches", (request, response) => {
  response.json(coches);
});

app.post("/coches", (request, response) => {
    console.log("Request: " + request.body);
    coches.push(request.body);
    response.json({"message": "ok"});
});

// Obtener un solo coche
app.get("/coches:id", (request, response) => {
    const id = request.params.id;
    const result = coches[id];
    response.json({result});
});

// Actualizar un solo coche
app.put("/coches:id", (request, response) => {
    const id = request.params.id;
    coches[id] = request.body;
    response.json({"message": "ok"});
});

// Borrar un coche
addEventListener.delete("/coches/:id", (request, response) => {
    const id = request.params.id;
    coches = coches.filter((item) => coches.indecOf(item) !== id);
    response.json({"message":"ok"})
});

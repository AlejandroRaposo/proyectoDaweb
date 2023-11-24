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

let concesionarios = [
  {
    nombre: "Concesionario1",
    direccion: "Calle Carlos",
    coches: [{ modelo: "Opel Corsa", cv: "120", precio: "12000" }],
  },
  {
    nombre: "Coches.com",
    direccion: "Calle Falsa",
    coches: [
      { modelo: "Renault Clio", cv: "100", precio: "9000" },
      { modelo: "Nissan Skyline R34", cv: "110", precio: "11000" },
    ],
  },
  {
    nombre: "CompraCoches",
    direccion: "Calle Alba",
    coches: [
      { modelo: "Hyundai i20", cv: "84", precio: "15465" },
      { modelo: "Volvo XC60", cv: "140", precio: "42615" },
      { modelo: "Nissan XTRAIL", cv: "204", precio: "46999" },
    ],
  },
  {
    nombre: "Coches de ofertas",
    direccion: "Plaza Ocaso",
    coches: [
      { modelo: "Peugeot 3008", cv: "300", precio: "39600" },
      { modelo: "Fiat 500x", cv: "130", precio: "27380" },
      { modelo: "Mercedes-Benz clase T 180", cv: "116", precio: "37190" },
      { modelo: "Citroen C5", cv: "131", precio: "33487" },
    ],
  }
];

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

// Crea un concesionario
app.post("/concesionarios", (request, response) => {
  console.log("Request: " + request.body);
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo concesionario
app.get("/concesionarios:id", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id];
  response.json({ result });
});

// Actualizar un solo concesionario
app.put("/concesionarios:id", (request, response) => {
  const id = request.params.id;
  concesionarios[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un concesionario
addEventListener.delete("/concesionarios/:id", (request, response) => {
  const id = request.params.id;
  concesionarios = concesionarios.filter((item) => concesionarios.indecOf(item) !== id);
  response.json({ message: "ok" });
});

// Obtener los coches de un concesionario
app.get("/concesionarios:id/coches", (request, response) => {
  const id = request.params.id;
  const result = concesionarios[id].coches;
  response.json({ result });
});

// Añadir un coche a un concesionario
app.post("/concesionarios:id/coches", (request, response) => {
  console.log("Request: " + request.body);
  concesionarios.push(request.body);
  response.json({ message: "ok" });
});

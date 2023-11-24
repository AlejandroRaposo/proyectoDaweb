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
  
let concesionarios = [{nombre:"Concesionario1",direccion:"Calle Carlos",coches : [{modelo:"Opel Corsa",cv:"120",precio:"12000"}]},
{nombre:"Coches.com",direccion:"Calle Falsa",coches : [{modelo:"Renault Clio",cv:"100",precio:"9000"},
{modelo:"Nissan Skyline R34",cv:"110",precio:"11000"}]},
{nombre:"CompraCoches",direccion:"Calle Alba",coches : [{modelo:"Hyundai i20",cv:"84",precio:"15465"},{modelo:"Volvo XC60",cv:"140",precio:"42615"},
{modelo:"Nissan XTRAIL",cv:"204",precio:"46999"}]},
{nombre:"Coches de ofertas",direccion:"Plaza Ocaso",coches : [{modelo:"Peugeot 3008",cv:"300",precio:"39600"},{modelo:"Fiat 500x",cv:"130",precio:"27380"},
{modelo:"Mercedes-Benz clase T 180",cv:"116",precio:"37190"},{modelo:"Citroen C5",cv:"131",precio:"33487"}]}]



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

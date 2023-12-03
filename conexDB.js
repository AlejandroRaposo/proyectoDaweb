const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Ponemos el nombre de la base de datos
const dbName = 'proyectoClase';

async function main() {
  // Usamos el método connect para conectarnos al servidor
  await client.connect();
  console.log('Conectado al servidor de forma correcta');
  

  // Pasamos los datos a la base de datos

  await createMultipleListings(client, [
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
  ]);

  return 'done.';
}

// Creamos la función
async function createMultipleListings(client, newListings){
  // Insertamos los datos introducidos en la colección concesionarios
  const result = await client.db(dbName).collection("concesionarios").insertMany(newListings);

  // Sacamos el mensaje para comprobar que funciona
  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);       
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
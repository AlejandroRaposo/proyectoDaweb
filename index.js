/**
 * Tres formas distintas de crear variables en javescript
 * var: Se puede modificar
 * let: Se puede modificar
 * const: Es constanta y no se puede modificar
 */

// Improtamos las librerías necesarías
// Concretamente el framework express
const express = require("express");
const { MongoClient, ObjectId  } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Ponemos el nombre de la base de datos
const dbName = 'proyectoClase';
let database = undefined;
let conCollection = undefined;


// Inicializamos a aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;


async function connexBD() {
  try {
    await client.connect();
    database = client.db(dbName);
    conCollection = database.collection("concesionarios");
  } catch (e) {
    console.error(e);
    console.log("ERROR de conexión a la BBDD");
    // Asegura que el cliente se cerrara al terminar o fallar
    await client.close();
  } finally {
  }
}

connexBD().catch(console.error);



app.use("/", express.json());

app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

app.get("/info", (request, response) => {
  responseponse.json({ version: "0.0.1" });
});


// Lista todos los concesionarios
app.get("/concesionarios", async (request, response) => {
  try {
    const curorConcesionarios = await conCollection.find({});
    const concesionarios = await curorConcesionarios.toArray();
    response.json(concesionarios);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Crea un concesionario
app.post("/concesionarios", async (request, response) => {
  try {
    const concesionarios = await conCollection.insertOne(request.body);
    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Obtener un solo concesionario
app.get("/concesionarios/:id", async (request, response) => {
  const conId = request.params.id;

  try {
    const curorConcesionarios = await conCollection.find({});
    const concesionarios = await curorConcesionarios.toArray();
    let concesionario = concesionarios[conId];
    let id = concesionario._id;
    id = id.toString();
    const resultado = await conCollection.findOne({
      _id:new ObjectId(id),
    });
   
    response.json(resultado);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Actualizar un solo 






app.put("/concesionarios/:id", async (request, response) => {
 
  const conId = request.params.id;
  
  const conAct = request.body;

  try {
  
    const curorConcesionarios = await conCollection.find({});
    const conce = await curorConcesionarios.toArray();
    let concesionario = conce[conId];
    let id = concesionario._id;
    id = id.toString();
    const resultado = await conCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          nombre:conAct["nombre"],
          direccion:conAct["direccion"],
          coches:conAct["coches"]
        }
         
        
      }
    );

    if (resultado.modifiedCount < 1) {
      throw "Ninguna modificacion";
    }

    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Borrar un concesionario
app.delete("/concesionarios/:id", async (request, response) => {
  const conId = request.params.id;
  try {
    const curorConcesionarios = await conCollection.find({});
    const concesionarios = await curorConcesionarios.toArray();
    let conce = concesionarios[conId];
    let id = conce._id;
    id = id.toString();
    const concesionario = await conCollection.deleteOne({
      _id: new ObjectId(id),
    });
    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});


// Obtener los coches de un concesionario
app.get("/concesionarios/:id/coches", async (request, response) => {
  const conId = request.params.id;
  try {
    const curorConcesionarios = await conCollection.find({});
    const conce = await curorConcesionarios.toArray();
    let concesionario = conce[conId];
    let id = concesionario._id;
    id = id.toString();
    const concesionarios = await conCollection.findOne({
      _id: new ObjectId(id),
    });
    response.json(concesionarios["coches"]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", async (request, response) => {
  const conId = request.params.id;
  const cocheNue = request.body;
  try {
    const curorConcesionarios = await conCollection.find({});
    const concesionarios = await curorConcesionarios.toArray();
    let concesionario = concesionarios[conId];
    let id = concesionario._id;
    id = id.toString();
    const resultado = await conCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          coches: cocheNue
        },
      }
    );
    if (resultado.modifiedCount < 1) {
      throw "Ninguna modificacion";
    }

    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});



// Obtener un coche de un concesionario
app.get("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const conId = request.params.id;
  const cocheId = request.params.cocheId;

  try {
    const curorConcesionarios = await conCollection.find({});
    const conce = await curorConcesionarios.toArray();
    let concesionario = conce[conId];
    let id = concesionario._id;
    id = id.toString();
    const concesionarios = await conCollection.findOne({
      _id: new ObjectId(id),
    });

    let cocheEnc = null;
    for (let i = 0; i < concesionarios.coches.length; i++) {
      if (i == parseInt(cocheId)) {
        cocheEnc = concesionarios.coches[i];
      }
    }
    if (!cocheEnc) {
      throw "No existe esa ID";
    }
    response.json(cocheEnc);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Actualizar un coche concreto de un  concesionario concreto
app.put("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const conId = request.params.id;
  const cocheId = request.params.cocheId;
  const cocheNue = request.body;

  try {
  
    const curorConcesionarios = await conCollection.find({});
    const conce = await curorConcesionarios.toArray();
    let concesionario = conce[conId];
    let id = concesionario._id;
    id = id.toString();
    const resultado = await conCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          [`coches.${cocheId}`]: cocheNue,
        },
      }
    );

    if (resultado.modifiedCount < 1) {
      throw "Ninguna modificacion";
    }

    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

// Borrar un coche concreto de un concesionario
app.delete("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const conId = request.params.id;
  const cocheId = request.params.cocheId;

  try {
    const curorConcesionarios = await conCollection.find({});
    const conce = await curorConcesionarios.toArray();
    let concesionario = conce[conId];
    let id = concesionario._id;
    id = id.toString();
    const concesionarios = await conCollection.findOne({
      _id: new ObjectId(id),
    });

    let cocheEnc = null;
    for (let i = 0; i < concesionarios.coches.length; i++) {
      if (i == parseInt(cocheId)) {
        cocheEnc = concesionarios.coches[i];
      }
    }
    if (!cocheEnc) {
      throw "No existe esa ID";
    }
    const resultado = await conCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $pull: {
          coches: { $eq: cocheEnc },
        },
      }
    );

    if (resultado.modifiedCount < 1) {
      throw "Ninguna modificacion";
    }
    response.json({ message: "Correcto" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});
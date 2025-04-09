// require('dotenv').config(); // Cargar las variables de entorno desde .env
// const mongoose = require('mongoose');

// // Obtener la URI de la base de datos desde las variables de entorno
// const MONGO_URI = process.env.MONGO_URI;

// // Verificar si la URI está definida
// if (!MONGO_URI) {
//   throw new Error('Please define the MONGO_URI environment variable');
// }

// /**
//  * Global es usado aquí para mantener una conexión en caché a través de recargas calientes
//  * en desarrollo. Esto previene que las conexiones crezcan exponencialmente durante el uso
//  * de las rutas de la API.
//  */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDb() {
//   if (cached.conn && cached.conn?._readyState === 1) {
//     return cached.conn;  // Si la conexión está lista, devuelve la conexión caché.
//   }

//   const disconnected = cached.conn && cached.conn?._readyState !== 1;
//   if (!cached.promise || disconnected) {
//     const opts = {
//       bufferCommands: false,
//       // Descomenta estos si quieres usar estas opciones
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     };

//     mongoose.set('strictQuery', true);  // Habilitar el modo estricto de consultas
//     cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;  // Esperar a que la conexión esté lista
//   return cached.conn;
// }

// module.exports = connectDb;  // Exportar la función de conexión
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn && cached.conn?._readyState === 1) {
    return cached.conn;
  }

  const disconnected = cached.conn && cached.conn?._readyState !== 1;
  if (!cached.promise || disconnected) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set('strictQuery', true); 
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDb;

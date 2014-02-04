 // -----------------------
 // Main
 // -----------------------

 module.exports = {
   development: {
     root: __dirname,
     db: 'mongodb://localhost/temp', //TODO: Agregar BD local acá
     realm: 'http://localhost:5000/'
   },
   test: {
     root: __dirname,
     db: 'mongodb://localhost/temp', //TODO: Agregar BD local acá
     realm: 'http://localhost:5000/'
   },
   staging: {
     root: __dirname,
     db: process.env.MONGOLAB_URI,
     realm: _DOMAIN
   },
   production: {
     root: __dirname,
     db: process.env.MONGOLAB_URI,
     realm: _DOMAIN
   }
 }
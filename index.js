const express = require('express');
const  routeuser=require('./route')
const path = require('path');
// const myconnection = require('express-myconnection');

// création d'une constante qui sera notre application express
const app = express();
// définition du middleware pour la connexion à la bd
// app.use(myconnection(mysql, optionbd, 'pool'));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Servir les images depuis le dossier externe
// const imagesAbsolutePath = 'C:/Users/Fatoumata DEMBELE/Desktop/images'; // Chemin absolu vers le dossier externe
// app.use('/images', express.static(imagesAbsolutePath));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/cuisine",routeuser)

// on dit sur quel port notre appli va tourner
app.set('port', 3000);
// création d'un serveur avec une fonction qui sera exécutée à chaque requête
const server = app.listen(app.get('port'), () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${app.get('port')}`);
});

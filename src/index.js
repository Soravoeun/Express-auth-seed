// Importation du framework Express
const express = require("express");

// Importation du routeur utilisateur défini dans le fichier userRoute.js
const userRouter = require("./routes/userRoute");

// Création d'une instance d'Express
const app = express();

// Importation de Mongoose pour la connexion à la base de données MongoDB
const mongoose = require("mongoose");

// Fonction principale asynchrone pour établir la connexion à la base de données
async function main() {
  // Connexion à la base de données MongoDB (ici, la base de données s'appelle "auth_DB")
  await mongoose.connect("mongodb://127.0.0.1:27017/auth_DB");
  console.log(`DATABASE CONNECTED`);
  // Utilisez ceci si votre base de données nécessite une authentification :
  // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');
}

// Appel de la fonction main pour établir la connexion à la base de données
main().catch((err) => console.log(err));

// Définition du port sur lequel le serveur écoute (dans ce cas, le port 4567)
const port = 4567;

// Configuration d'Express pour utiliser le middleware permettant de traiter les données JSON et les données de formulaire
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Utilisation du routeur utilisateur pour gérer les routes liées aux utilisateurs
app.use("/users", userRouter);

// Lancement du serveur Express pour écouter sur le port spécifié
app.listen(port, () => console.log(`Server listening on port: ${port}`));

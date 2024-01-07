// Importation des fonctions de contrôleur pour l'inscription et la connexion
const { store, login } = require("../controllers/userController");

// Création d'un routeur Express
const userRouter = require("express").Router();

// Définition des routes avec les fonctions de contrôleur associées
userRouter.post("/inscription", store); // Route POST pour l'inscription, associée à la fonction store du contrôleur
userRouter.post("/connexion", login); // Route POST pour la connexion, associée à la fonction login du contrôleur

// Exportation du routeur pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = userRouter;

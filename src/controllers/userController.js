// Importation du modèle d'utilisateur défini dans le fichier userModel.js
const User = require("../models/userModel");

// Importation du module JSON Web Token (JWT) pour la gestion de l'authentification
const jwt = require("jsonwebtoken");

// Fonction asynchrone pour l'enregistrement (inscription) d'un utilisateur
const store = async (req, res) => {
  try {
    // Création d'une nouvelle instance de l'utilisateur
    const user = new User();

    // Attribution de la valeur de l'email et du mot de passe à l'utilisateur
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);

    // Enregistrement de l'utilisateur dans la base de données
    user.save();

    // Génération d'un jeton JWT pour l'utilisateur
    const token = jwt.sign({ id: user.id }, "simplon-secret", {
      expiresIn: "1h",
    });

    // Renvoi de l'utilisateur et du jeton en tant que réponse JSON
    res.json({ user, token });
  } catch (error) {
    // Gestion des erreurs et affichage dans la console
    console.error(error.message);
  }
};

// Fonction asynchrone pour la connexion d'un utilisateur
const login = async (req, res) => {
  // Récupération des informations d'authentification depuis la requête
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Recherche de l'utilisateur dans la base de données par son email
    // Utilisation de .select("+password") pour récupérer le mot de passe
    const user = await User.findOne({ email }).select("+password");

    // Vérification de l'existence de l'utilisateur
    if (!user) {
      const error = new Error("Invalid email address");
      throw error;
    }

    // Vérification du mot de passe
    const validPassword = await user.validPassword(password, user.password);
    if (!validPassword) {
      const error = new Error("Invalid password");
      throw error;
    }

    // Génération d'un jeton JWT pour l'utilisateur
    const token = jwt.sign({ id: user.id }, "simplon-secret", {
      expiresIn: "1h",
    });

    // Renvoi de l'utilisateur connecté et d'un message en tant que réponse JSON
    res.json({ user, message: "Vous êtes connecté" });
  } catch (error) {
    // Gestion des erreurs et affichage dans la console
    console.error(error.message);
  }
};

// Exportation des fonctions d'inscription et de connexion
module.exports = { store, login };

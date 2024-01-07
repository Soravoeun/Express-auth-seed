// Importation des modules nécessaires
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Création d'un schéma mongoose pour représenter la structure des utilisateurs
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, unique: true }, // Champ email de type chaîne de caractères, unique dans la collection
  password: String, // Champ password de type chaîne de caractères
});

// Ajout de méthodes personnalisées au schéma pour le cryptage et la validation du mot de passe
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5); // Génération d'un sel avec un coût de 5 (nombre d'itérations)
  const hash = await bcrypt.hash(password, salt); // Hachage du mot de passe avec le sel généré
  return hash; // Renvoie du mot de passe haché
};

userSchema.methods.validPassword = async (newPass, oldPassword) => {
  const result = await bcrypt.compare(newPass, oldPassword); // Comparaison entre le nouveau mot de passe et l'ancien haché
  return result; // Renvoie du résultat de la comparaison (true si correspondance, false sinon)
};

// Création d'un modèle mongoose basé sur le schéma
const User = mongoose.model("User", userSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = User;

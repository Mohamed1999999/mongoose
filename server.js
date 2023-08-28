const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware pour gérer les données JSON dans les requêtes
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connexion à la base de données MongoDB
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

// Point d'entrée de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});

// Écoute du serveur sur le port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

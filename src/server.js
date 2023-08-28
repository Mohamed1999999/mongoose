const express = require("express");
const app = express();

// Middleware pour gérer les données JSON dans les requêtes
app.use(express.json());

// Middleware de journalisation simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
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

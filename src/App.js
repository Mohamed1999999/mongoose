const mongoose = require("mongoose");
require("dotenv").config();

// Connexion à la base de données MongoDB
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données");

    // Définition du schéma de personne
    const personneSchema = new mongoose.Schema({
      nom: {
        type: String,
        required: true,
      },
      âge: Number,
      favoriteFoods: [String],
      email: String,
      dateInscription: {
        type: Date,
        default: Date.now,
      },
    });

    // Création du modèle Personne
    const Personne = mongoose.model("Personne", personneSchema);

    // Création d'une nouvelle personne
    const nouvellePersonne = new Personne({
      nom: "Alice",
      âge: 25,
      favoriteFoods: ["Sushi", "Pasta"],
      email: "alice@example.com",
    });

    // Enregistrement de la personne dans la base de données
    nouvellePersonne
      .save()
      .then(() => {
        console.log("Personne ajoutée à la base de données");

        // Recherche de toutes les personnes ayant un prénom spécifique
        Personne.find({ nom: "Alice" })
          .then((personnes) => {
            console.log("Personnes trouvées :", personnes);

            // Recherche de la personne par _id et mise à jour de son âge
            const personId = personnes[0]._id;
            Personne.findOneAndUpdate(
              { _id: personId },
              { âge: 30 },
              { new: true }
            )
              .then((personneMiseAJour) => {
                console.log("Personne mise à jour :", personneMiseAJour);

                // Suppression de toutes les personnes avec le nom spécifié
                Personne.deleteMany({ nom: "Mary" })
                  .then((resultat) => {
                    console.log(
                      `${resultat.deletedCount} personnes ont été supprimées`
                    );

                    // Recherche des personnes qui aiment les burritos, triées par nom,
                    // limitées à deux documents, en masquant l'âge
                    Personne.find({ favoriteFoods: "burrito" })
                      .sort({ nom: 1 })
                      .limit(2)
                      .select("-âge")
                      .exec((err, data) => {
                        if (err) {
                          console.error(
                            "Erreur lors de la recherche des personnes :",
                            err
                          );
                        } else {
                          console.log(
                            "Personnes qui aiment les burritos :",
                            data
                          );
                        }
                      });
                  })
                  .catch((err) => {
                    console.error(
                      "Erreur lors de la suppression des personnes :",
                      err
                    );
                  });
              })
              .catch((err) => {
                console.error(
                  "Erreur lors de la recherche et de la mise à jour de la personne :",
                  err
                );
              });
          })
          .catch((err) => {
            console.error("Erreur lors de la recherche des personnes :", err);
          });
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de la personne :", err);
      });
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

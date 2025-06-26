import Step from './src/app/models/Step.js';
import client from './src/app/database.js';

// test de la méthode create de la classe Step
(async () => {
  try {
    // On crée une instance de la classe Step avec les données de l'étape
    const step = new Step(
      null, // ID auto-incrémenté
      1, // Numéro de l'étape
      'Assaisoner et déguster.', // Description de l'étape
      { id: 1 } // Référence à la recette (ID de la recette)
    );

    // On appelle la méthode create pour insérer l'étape dans la base de données
    const result = await step.create();
    // Affiche le nombre de lignes insérées dans la base de données
    console.log(`Étape insérée avec succès (${result} ligne(s)).`);
  } catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de l’insertion : ${err.message}`);
  } finally {
    await client.end(); // Ferme la connexion proprement
  }
})();
import Step from './src/app/models/Step.js';
import client from './src/app/database.js';

// test de la méthode create de la classe Step
/*(async () => {
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
})();*/

// Test de la méthode findAll de la classe Step
/*(async () => {
  try {
    // On appelle la méthode findAll pour récupérer toutes les étapes
    const steps = await Step.findAll();
    // Affiche le nombre d'étapes trouvées
    console.log(`Nombre d'étapes trouvées : ${steps.length}`);
    // Affiche les détails de chaque étape
    steps.forEach(step => {
      console.log(`Étape ${step.number} : ${step.description}`);
    });
  } catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de la récupération des étapes : ${err.message}`);
  } finally {
    await client.end(); // Ferme la connexion proprement
  }
})();*/

// Test de la méthode FindById de la classe Step
/*(async () => {
    try {
        // On appelle la méthode findById pour récupérer une étape par son ID
        // Ici, on cherche l'étape avec l'ID 1
        const step = await Step.findById(2);
        
        // Affiche les détails de l'étape récupérée
        console.log(`Étape trouvée : ${step.number} - ${step.description}`);
    } catch (err) {
        // En cas d'erreur, on affiche un message d'erreur
        console.error(`Erreur lors de la récupération de l'étape : ${err.message}`);
    } finally {
        await client.end(); // Ferme la connexion proprement
    }
    })();*/

// Test d'update d'une étape
/*(async () => {
    try {
        // On crée une instance de la classe Step avec les données de l'étape à mettre à jour
        const step = new Step(
        1, // ID de l'étape à mettre à jour
        1, // Nouveau numéro de l'étape
        'Laver et couper la salade.', // Nouvelle description de l'étape
        { id: 1 } // Référence à la recette (ID de la recette)
        );
    
        // On appelle la méthode update pour mettre à jour l'étape dans la base de données
        const result = await step.update();
        // Affiche le nombre de lignes mises à jour dans la base de données
        console.log(`Étape mise à jour avec succès (${result} ligne(s)).`);
    } catch (err) {
        // En cas d'erreur, on affiche un message d'erreur
        console.error(`Erreur lors de la mise à jour : ${err.message}`);
    } finally {
        await client.end(); // Ferme la connexion proprement
    }
    })();*/

// Test de la méthode delete de la classe Step
(async () => {
    try {
        // On crée une instance de la classe Step avec l'ID de l'étape à supprimer
        const step = new Step(
        1, // ID de l'étape à supprimer
        null, // Numéro de l'étape (non utilisé pour la suppression)
        null, // Description de l'étape (non utilisée pour la suppression)
        { id: 1 } // Référence à la recette (ID de la recette, non utilisée pour la suppression)
        );
    
        // On appelle la méthode delete pour supprimer l'étape dans la base de données
        const result = await step.delete();
        // Affiche le nombre de lignes supprimées dans la base de données
        console.log(`Étape supprimée avec succès (${result} ligne(s)).`);
    } catch (err) {
        // En cas d'erreur, on affiche un message d'erreur
        console.error(`Erreur lors de la suppression : ${err.message}`);
    } finally {
        await client.end(); // Ferme la connexion proprement
    }
    })();
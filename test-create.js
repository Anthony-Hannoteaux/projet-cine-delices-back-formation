import Recipe from './src/app/models/Recipe.js';
import client from './src/app/database.js';

// test de la méthode create de la classe Recipe

/*(async () => {
  try {
    // On crée une instance de la classe Recipe avec les données de la recette
    // Les paramètres sont passés dans l'ordre défini par le constructeur de la classe Recipe
    // Ici, on insère une recette de crêpes Suzette
    // Les valeurs nulles sont utilisées pour les champs auto-incrémentés ou non requis
    // On utilise des valeurs fictives pour les autres champs
    const recette = new Recipe(
      null,
      'Crêpes Suzette',
      'Des crêpes flambées à l’orange',
      'Raisonnable',
      '€',
      4,
      10,
      5,
      'Un classique de la cuisine française',
      'crepes.jpg',
      1
    );
    
    // On appelle la méthode create pour insérer la recette dans la base de données
    const result = await recette.create();
    // Affiche le nombre de lignes insérées dans la base de données
    console.log(`Recette insérée avec succès (${result} ligne(s)).`);
  } catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de l’insertion : ${err.message}`);
  } finally {
    await client.end(); // Ferme la connexion proprement
  }
})();*/


// Test de la méthode findById de la classe Recipe
/*(async () => {
  try {
    // On appelle la méthode findById pour récupérer une recette par son ID
    // Ici, on cherche la recette avec l'ID 1
    const recette = await Recipe.findById(1);
    
    // Affiche les détails de la recette récupérée
    console.log(`Recette trouvée : ${recette.title} - ${recette.description}`);
  } catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de la récupération de la recette : ${err.message}`);
  } finally {
    await client.end(); // Ferme la connexion proprement
  }
})();*/

// Test d'update d'une recette
/*(async () => {
  try {
    // On crée une instance de la classe Recipe avec les données de la recette à mettre à jour
    const recette = new Recipe(
      1, // ID de la recette à mettre à jour
      'Crêpes Suzette revisitées',
      'Des crêpes flambées à l’orange avec une touche moderne',
      'Raisonnable',
      '€',
      4,
      10,
      5,
      'Un classique de la cuisine française revisité',
      'crepes_revisitees.jpg',
      1
    );
    
    // On appelle la méthode update pour mettre à jour la recette dans la base de données
    const result = await recette.update();
    console.log(`Recette mise à jour avec succès (${result} ligne(s)).`);
  }
  catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de la mise à jour : ${err.message}`);
  } finally {
    await client.end(); // Ferme la connexion proprement
  }
})();*/

// Test de la méthode delete de la classe Recipe
/*(async () => {
  try {
    // On crée une instance de la classe Recipe avec l'ID de la recette à supprimer
    const recette = await Recipe.findById(3);
    console.log(recette)
    // On appelle la méthode delete pour supprimer la recette de la base de données
    const result = await recette.delete();
    console.log(`Recette supprimée avec succès (${result} ligne(s)).`);
}
  catch (err) {
    // En cas d'erreur, on affiche un message d'erreur
    console.error(`Erreur lors de la récupération de la recette : ${err.message}`);
  }
})();*/

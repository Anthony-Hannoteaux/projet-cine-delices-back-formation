import Recipe from './src/app/models/Recipe.js';
import db from './src/app/db.js';

// test de la méthode create de la classe Recipe

(async () => {
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
    await db.end(); // Ferme la connexion proprement
  }
})();

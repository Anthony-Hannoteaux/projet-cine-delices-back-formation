//import du client PostgreSQL
import client from "../database.js";

const movieController = {
  // Déclaration de la méthode asynchrone
  autocomplete: async (req, res) => {
    
    // On extrait la query string search depuis l’URL
    const { search } = req.query;

    // on bloque les recherches trop courtes ou absentes pour éviter des requêtes trop larges.
    if (!search || search.length < 2) {
      return res.status(400).json({ error: "Recherche trop courte" });
    }

    try {
      // Lancement d'une recherche paramétrée (ILIKE = recherche insensible à la casse / %${search}% = recherche contenant le texte / LIMIT 10 = tu limites à 10 résultats / ORDER BY title ASC = trie alphabétique)
      const result = await client.query(
        `SELECT id, title FROM movie WHERE LOWER(title) ILIKE $1 ORDER BY title ASC LIMIT 10`,
        [`%${search.toLowerCase()}%`]
      );

    // On renvoie un tableau d'objets coté front de { id, title }
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de l'autocomplétion des films :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
};

export default movieController;

import fetchCatalogue from '../services/catalogueService.js';

const apiController = {
  catalogue: async (req, res) => {
    try {
      //On récupère deux paramètres de la requête URL
      const { type = "movie", page = 1 } = req.query;
      //On appelle la fonction fetchCatalogue() pour aller chercher les films ou séries correspondants via l'API TMDb.
      const results = await fetchCatalogue(type, page);
      //On renvoie les données sous forme JSON
      res.json(results);
      //Gestion d'une éventuelle erreur
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default apiController;

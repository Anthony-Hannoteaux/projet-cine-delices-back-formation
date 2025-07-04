import client from "../database.js";

const movieController = {
  autocomplete: async (req, res) => {
    
    console.log("🔥 Route autocomplete appelée avec :", req.query.search);
    const { search } = req.query;

    if (!search || search.length < 2) {
      return res.status(400).json({ error: "Recherche trop courte" });
    }

    try {
      const result = await client.query(
        `SELECT id, title FROM movie WHERE LOWER(title) ILIKE $1 ORDER BY title ASC LIMIT 10`,
        [`%${search.toLowerCase()}%`]
      );

    // On renvoie un tableau de { id, title }
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de l'autocomplétion des films :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  /*try {
    const result = await client.query(`SELECT * FROM movie LIMIT 10`);
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur récupération films :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }*/


  }
};

export default movieController;

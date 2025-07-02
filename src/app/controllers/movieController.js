import Movie from "../models/Movie.js";

const movieController = {
    // ajout d'un film
    createMovie: async(req.res) => {
    // bloc try, premier composant de la structure de gestion des erreurs, contient le code à éxécuter tout en surveillant les erreurs potentielles
    try {
        // récupération des propriétés attendues depuis le corps de la requête
        const {
            TMDB_id, title, overview, poster_path, media_type
        } = req.body;

        // création d'une nouvelle instance de Movie avec les données reçues
        const movieToAdd = new Movie(
            TMDB_id, title, overview, poster_path, media_type
        );

        // appel de la méthode d'instance create() pour l'insertion dans la BDD
        const result = await movieToAdd.create();
        // renvoi du résultat au format JSON avec le statut 201 corespondant à "created"
        res.status(201).json({ message: "Film créé avec succès", inserted: result });
    }
    // bloc catch, à exécuter en cas d'erreur dans le bloc try
    catch (error) {
        // affichage du message d'erreur avec le statut 500 correspondant à une erreur serveur interne
        res.status(500).json({ error: "Erreur lors de la création du film" });
    }
},
}

export default movieController;
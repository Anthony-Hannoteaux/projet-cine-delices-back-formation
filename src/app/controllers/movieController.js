import Movie from "../models/Movie.js";

const movieController = {

    // ajout d'un film
    createMovie: async (req, res) => {
        // bloc try, premier composant de la structure de gestion des erreurs, contient le code à éxécuter tout en surveillant les erreurs potentielles
        try {
            // récupération des propriétés attendues depuis le corps de la requête
            const {
                TMDB_id, title, overview, poster_path, media_type
            } = req.body;
            // création d'une nouvelle instance de Movie avec les données reçues
            const movieToAdd = new Movie(
                TMDB_id, title, overview, poster_path, media_type
            )

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

    // lecture de tous les enregistrements de la table "movie"
    getAllMovies: async (req, res) => {
        try {
            // appel à la méthode statique findAll() de la classe Movie
            const allMovies = await Movie.findAll();
            // renvoi des enregistrements au format JSON, avec un statut 200 pour ok
            res.status(200).json(allMovies);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération de tous les films" })
        }
    },

    // récupération d'un film à partir de l'id
    getMovieById: async (req, res) => {
        // récupération de l'id dans les paramètres de la requête, celle-ci étant au départ une string, méthode parseInt pour la transformer en entier
        const movieId = parseInt(req.params.id);
        try {
            const movieById = await Movie.findById(movieId);
            if (!movieById) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            res.status(200).json(movieById);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération du film" })

        };
    },

    // modification d'un film à partir de l'id
    updateMovie: async (req, res) => {
        try {
            // récupération de l'id dans les paramètres de la requête et conversion en entier
            const movieId = parseInt(req.params.id);
            const movieById = await Movie.findById(movieId);
            if (!movieById) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            const { TMDB_id, title, overview, poster_path, media_type } = req.body;
            const updatedMovie = await movieById.update({ TMDB_id, title, overview, poster_path, media_type });
            res.status(200).json({ message: "Le film a bien été mis à jour", modified: updatedMovie });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la modification du film" });
        }
    },

    deleteMovie: async (req, res) => {
        try {
            // récupération de l'id dans les paramètres de la requête et conversion en entier
            const movieId = parseInt(req.params.id);
            const movieToDelete = await Movie.findById(movieId);
            if (!movieToDelete) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            const deletedMovie = await movieToDelete.delete();
            res.status(200).json({ message: "Le film a bien été supprimé", removed: deletedMovie });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du film" });
        }
    }
};

export default movieController;
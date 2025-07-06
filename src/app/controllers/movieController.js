import Movie from "../models/Movie.js";

const movieController = {

    // ajout d'un film
    createMovie: async (req, res) => {
        // bloc try, premier composant de la structure de gestion des erreurs, contient le code à éxécuter tout en surveillant les erreurs potentielles
        try {
            // récupération des propriétés attendues depuis le corps de la requête qui ne contient que des strings
            // et conversion des valeurs numériques en entiers
            const {
                title, genre, overview, poster_path, media_type
            } = req.body;
            const id = parseInt(req.body.id);
            const TMDB_id = parseInt(req.body.TMDB_id);
            // création d'une nouvelle instance de Movie avec les données reçues
            const movieToAdd = new Movie(
                id, TMDB_id, title, genre, overview, poster_path, media_type
            )

            // appel de la méthode d'instance create() pour l'insertion dans la BDD
            const result = await movieToAdd.create();
            // renvoi du résultat au format JSON avec le statut 201 corespondant à "created"
            return res.status(201).json({ message: "Film créé avec succès", inserted: result });
        }
        // bloc catch, à exécuter en cas d'erreur dans le bloc try
        catch (error) {
            // affichage du message d'erreur avec le statut 500 correspondant à une erreur serveur interne
            return res.status(500).json({ error: "Erreur lors de la création du film" });
        }
    },

    // lecture de tous les enregistrements de la table "movie"
    getAllMovies: async (req, res) => {
        try {
            // appel à la méthode statique findAll() de la classe Movie
            const allMovies = await Movie.findAll();
            // renvoi des enregistrements au format JSON, avec un statut 200 pour ok
            return res.status(200).json(allMovies);
        }
        catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération de tous les films" })
        }
    },

    // récupération d'un film à partir de l'id
    getMovieById: async (req, res) => {
        // récupération de l'id dans les paramètres de la requête, celle-ci étant au départ une string, méthode parseInt pour la transformer en entier
        const movieId = parseInt(req.params.id);
        try {
            const movieById = await Movie.findById(movieId);
            if (!movieById) {
                return res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            return res.status(200).json(movieById);
        }
        catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération du film" })

        }
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
            // récupération des propriétés attendues depuis le corps de la requête qui ne contient que des strings
            // et conversion des valeurs numériques en entiers
            const {
                title, genre, overview, poster_path, media_type
            } = req.body;
            const id = parseInt(req.body.id);
            const TMDB_id = parseInt(req.body.TMDB_id);
            // création d'une nouvelle instance de Movie avec les données reçues dans le corps de la requête
            const updatedMovie = new Movie(
                id, TMDB_id, title, genre, overview, poster_path, media_type
            )

            // appel de la méthode d'instance update() pour l'insertion dans la BDD
            const result = await updatedMovie.update();
            // si result est false, alors affichage d'un message d'erreur avec le statut 304 correspondant à "not modified"
            if (!result) {
                return res.status(304).json({ error: "Modification non effectuée" })
            }
            // renvoi du résultat au format JSON avec le statut 200 corespondant à "OK"
            return res.status(200).json({ message: "Film modifié avec succès", modified: result });
        }
        // bloc catch, à exécuter en cas d'erreur dans le bloc try
        catch (error) {
            // affichage du message d'erreur avec le statut 500 correspondant à une erreur serveur interne
            return res.status(500).json({ error: "Erreur lors de la modification du film" });
        }
    },

    deleteMovie: async (req, res) => {
        try {
            // récupération de l'id dans les paramètres de la requête et conversion en entier
            const movieId = parseInt(req.params.id);
            const movieById = await Movie.findById(movieId);
            if (!movieById) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            // création de l'instance du film à supprimer
            const movieToDelete = new Movie(movieById)
            // appel de la méthode d'instance delete
            const deletedMovie = await movieToDelete.delete();
            res.status(200).json({ message: "Le film a bien été supprimé", removed: deletedMovie });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du film" });
        }
    }
};

export default movieController;
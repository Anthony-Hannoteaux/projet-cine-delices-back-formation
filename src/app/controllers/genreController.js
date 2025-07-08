import Genre from "../models/Genre.js";

const genreController = {

    // ajout d'un genre
    createGenre: async (req, res) => {
        // bloc try, premier composant de la structure de gestion des erreurs, contient le code à éxécuter tout en surveillant les erreurs potentielles
        try {
            // récupération des propriétés attendues depuis le corps de la requête qui ne contient que des strings
            const genreName = req.body.name;

            // création d'une nouvelle instance de Genre avec les données reçues
            const genreToAdd = new Genre({ genreName })

            // appel de la méthode d'instance create() pour l'insertion dans la BDD
            const result = await genreToAdd.create();
            // renvoi du résultat au format JSON avec le statut 201 corespondant à "created"
            return res.status(201).json({ message: "Genre créé avec succès", inserted: result });
        }
        // bloc catch, à exécuter en cas d'erreur dans le bloc try
        catch (error) {
            // affichage du message d'erreur avec le statut 500 correspondant à une erreur serveur interne
            return res.status(500).json({ error: "Erreur lors de la création du genre" });
        }
    },

    // lecture de tous les enregistrements de la table "Genre"
    getAllGenres: async (req, res) => {
        try {
            // appel à la méthode statique findAll() de la classe Genre
            const allGenres = await Genre.findAll();
            // renvoi des enregistrements au format JSON, avec un statut 200 pour ok
            return res.status(200).json(allGenres);
        }
        catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération de tous les genres" })
        }
    },

    // récupération d'un film à partir de l'id
    getGenreById: async (req, res) => {
        // récupération de l'id dans les paramètres de la requête, celle-ci étant au départ une string, méthode parseInt pour la transformer en entier
        const genreId = parseInt(req.params.id);
        try {
            const genreById = await Genre.findById(genreId);
            // console.log(genreById)
            if (!genreById) {
                return res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            return res.status(200).json(genreById);
        }
        catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération du genre" })

        }
    },

    // modification d'un film à partir de l'id
    updateGenre: async (req, res) => {
        try {
            // récupération de l'id dans les paramètres de la requête et conversion en entier
            const genreId = parseInt(req.params.id);
            const genre = await Genre.findById(genreId);
            if (!genre) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }

            // récupération de l'objet avec son index
            const genreToUpdate = genre[0];
            // fusion des propriétés du film à modifier et celles du corps de la requête
            const mergeGenreProperties = Object.assign(genreToUpdate, req.body);
            // création d'une nouvelle instance de Genre avec les données reçues
            const newGenre = new Genre(mergeGenreProperties);
            // appel à la méthode d'instance update() pour l'insertion dans la BDD
            const updatedGenre = await newGenre.update();
            // si result est false, alors affichage d'un message d'erreur avec le statut 304 correspondant à "not modified"
            if (updatedGenre === 0) {
                return res.status(304).json({ error: "Modification non effectuée" });
            }
            // renvoi du résultat au format JSON avec le statut 200 corespondant à "OK"
            return res.status(200).json({ message: "Genre modifié avec succès", modified: genre });
        }
        // bloc catch, à exécuter en cas d'erreur dans le bloc try
        catch (error) {
            // affichage du message d'erreur avec le statut 500 correspondant à une erreur serveur interne
            return res.status(500).json({ error: "Erreur lors de la modification du genre" });
        }
    },

    deleteGenre: async (req, res) => {
        try {
            // récupération de l'id dans les paramètres de la requête et conversion en entier
            const genreId = parseInt(req.params.id);
            const genreById = await Genre.findById(genreId);
            if (!genreById) {
                res.status(404).json({ error: "L'id spécifié n'existe pas" })
            }
            // récupération de l'objet à partir de son index
            const genre = genreById[0]
            // création de l'instance du film à supprimer
            const genreToDelete = new Genre(genre)
            // appel de la méthode d'instance delete
            const deletedGenre = await genreToDelete.delete();
            res.status(200).json({ message: "genre a bien été supprimé", removed: deletedGenre });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du genre" });
        }
    }
};

export default genreController;
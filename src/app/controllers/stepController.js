import Step from "../models/Step.js";

const stepController = {
    // utilisation d'une fonction avec une méthode asynchrone pour créer une catégorie
    createStep: async (req, res) => {
        try {
            // on récupère le corps de la requête http grâce à body
            const { number, description, recipe } = req.body;
            // condition afin de vérifier que tous les champs soient présents
            if (!number || !description || !recipe) {
                // si non, erreur
                return res.status(400).json("Tous les champs sont obligatoies.");
            }
            // instanciation de step (null ici car id auto-incrémenté)
            const newStep = new Step(null, number, description, recipe);
            // méthode create pour ajouter l'étape
            const result = await newStep.create();
            // si aucun ajout 
            if (result === 0) {
                // renvoie une erreur
                return res.status(400).json("Échec de la création de l'étape.")
            }
            // si tout est ok, renvoie l'étape avec un message 
            return res.json({ message: " Étape créée avec succès !", result });
        } catch (error) {
            // console.log("Erreur lors de la création de l'étape :", error);
            // alors on renvoie un status 500 (internal erreur servor) avec un message d'erreur
            return res.status(500).json("Impossible d'ajouter une étape.");
        }
    },

    getAllSteps: async (req, res) => {
        try {
            // on utilise la méthode findAll pour trouver toutes les étapes
            const result = await Step.findAll();
            // renvoie une réponse en json
            return res.json(result);
            // si erreur
        } catch (error) {
            // console.log("Erreur lors de la récupération des étapes :", error);
            // alors on renvoie un status 500 avec un message d'erreur
            return res.status(500).json("Impossible de récupérer les étapes.");
        }
    },

    getStepById: async (req, res) => {
        try {
            // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
            const id = parseInt(req.params.id);
            // vérifie que l'id est un nombre valide via la fonction isNan
            if (isNaN(id)) {
                // si oui, alors renvoie un status 400 (bad request) avec un message d'erreur
                return res.status(400).json("Id non valide.");
            }
            // on recherche la categorie via son id
            const result = await Step.findById(id);
            // si différent de result, donc de l'id
            if (!result) {
                // on renvoie un status 404 (not found) avec un message d'erreur
                return res.status(404).json("Étape introuvable.");
            }
            // sinon on renvoie l'étape
            return res.json(result);
        } catch (error) {
            // console.log("Erreur lors de la récupération de l'étape :", error);
            return res.status(500).json("Impossible de récupérer l'étape.");
        }
    },

    updateStep: async (req, res) => {
        try {
            // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
            const id = parseInt(req.params.id);
            // on récupère le corps de la requête http grâce à body
            const { number, description, recipe } = req.body;
            // condition afin de vérifier que tous les champs soient présents
            if (!number || !description || !recipe) {
                // sinon, erreur
                return res.status(400).json("Tous les champs sont obligatoies.");
            }
            // instanciation de Step avec les données à mettre à jour
            const newStep = new Step(id, number, description, recipe);
            // execution de la mise à jour avec la méthode update
            const result = await newStep.update();
            // si aucune modification
            if (result === 0) {
                // renvoie une erreur
                return res.status(400).json("Étape non trouvée.")
            }
            return res.json(result, ": Étape modifiée avec succès");
        } catch (error) {
            console.log("Erreur lors de la mise à jour de l'étape :", error);
            return res.status(500).json("Impossible de mettre à jour l'étape.");
        }
    },

    deleteStep: async (req, res) => {
        try {
            // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
            const id = parseInt(req.params.id);
            // vérifie que l'id est un nombre valide via la fonction isNan, si c'est pas le cas
            if (isNaN(id)) {
                // renvoie une erreur
                return res.status(400).json("l'id n'est pas valide.");
            }
            // instanciation de Step via l'id uniquement
            const newStep = new Step(id);
            // execution de la méthode delete pour supprimer l'étape
            const result = await newStep.delete();
            // si aucune suppression de l'étape
            if (result === 0) {
                // renvoie une erreur
                return res.status(404).json("Étape non trouvée.")
            }
            // sinon renvoie le resultat après suppression effectuée
            return res.json(result);
        } catch (error) {
            console.log("Erreur lors de la suppression de l'étape :", error);
            return res.status(500).json("Impossible de supprimer la catégorie.");
        }
    },
};

export default stepController;
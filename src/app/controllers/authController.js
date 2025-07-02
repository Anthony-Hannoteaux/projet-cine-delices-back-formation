import User from "../models/User.js";
import apiController from "./apiController.js";

const authController = {
    getAllUser: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: "Erreur interne du serveur." })
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await User.findById(id);
            // Si aucune correspondance, renvoie un tableau vide car pas d'utilisateur pour cet ID
            if (result.length === 0) {
                throw new Error('Aucune correspondance pour cette ID')
            }
            return res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error.message)
        }
    },

    createNewUser: async (req, res) => {
        try {
            /**
             * Nous souhaitons vérifié si une correspondance existe entre l'email récupéré
             * Et ceux stocké dans notre BDD
             */
            // On commence par listé tout nos utilisateurs
            const AllUser = await User.findAll();
            // Pour tout les objet user
            AllUser.map((user) => {
                // Si l'email stocké en BDD correspond à celui récupéré dans le body de notre requêtes
                if (user.email === req.body.email) {
                    throw new Error('Utilisateur déjà existant')
                }
            })
            const newUser = new User(req.body)
            newUser.create()
            return res.status(200).json("Nouvel utilisateur enregistré avec succès")
        }
        catch (error) {
            res.status(409).json(error.message)
        }
    }
}

export default authController;
import User from "../models/User.js";
import apiController from "./apiController.js";

const authController = {
    // Route GET /api/users
    getAllUser: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: "Erreur interne du serveur." })
        }
    },

    // Route GET /api/users/:id
    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await User.findById(id);
            // Gestion d'erreur si result est false (donc pas d'utilisateur à cet ID)
            if (!result) {
                throw new Error('Aucune correspondance pour cette ID')
            }
            return res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error.message)
        }
    },

    // Route POST /api/users
    createNewUser: async (req, res) => {
        try {
            /**
             * Nous souhaitons vérifié si une correspondance existe entre l'email récupéré
             * Et ceux stocké dans notre BDD
             */
            // On commence par listé tout nos utilisateurs
            const AllUser = await User.findAll();
            // Pour tout les objet user
            for (let index = 0; index <= AllUser.length - 1; index++) {
                const userEmail = AllUser[index].email;
                // Si l'email stocké en BDD correspond à celui récupéré dans le body de notre requêtes
                if (userEmail === req.body.email) {
                    throw new Error('Utilisateur déjà existant')
                }
            }
            const newUser = new User(req.body)
            await newUser.create()
            return res.status(200).json("Nouvel utilisateur enregistré avec succès")
        }
        catch (error) {
            res.status(409).json(error.message)
        }
    },

    // Route PATCH /api/users/:id
    updateUser: async (req, res) => {
        try {
            // On commence par récupérer l'ID passé en paramètre de notre url
            const id = parseInt(req.params.id);
            // On instancie un objet de type User pour l'enregistrement récupérée
            const user = await User.findById(id)
            // On prévoit une gestion d'erreur
            if (user === undefined) {
                throw new Error("Aucune correspondance pour cette ID")
            }
            /**
             * On aura donc besoin de l'objet user et des valeurs du corps de la requête
             * Nous utiliserons le spred operator ``...``
             * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#examples
            */
            const userUpdate = { ...user, ...req.body }
            // On initialise notre objet de type User
            const newUpdate = new User(userUpdate)
            /**
             * On fait appel à notre méthode d'instance pour faire appel à la requête associée
             * Et on stock le résultat
             */
            const rowCounts = await newUpdate.update()
            // Gestion d'erreur
            if (rowCounts === 0) {
                throw new Error('Erreur lors de la mise à jour des informations utilisateur.')
            }
            res.status(200).json("Mise à jour du profil utilisateur effectuée.")
        } catch (error) {
            res.status(409).json(error.message)
        }
    },

    // Route DELETE /api/users/:id
    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.findById(id);
            if (user === undefined) {
                throw new Error("Aucune correspondance pour cette ID")
            }
            const deletedUser = new User(user)
            const rowCounts = await deletedUser.delete()
            if (rowCounts === 0) {
                throw new Error("Erreur lors de la supression de l'utilisateur.")
            }
            return res.status(200).json("Suppression de l'utilisateur effectuée.")
        } catch (error) {
            res.status(409).json(error.message)
        }
    }
}

export default authController;
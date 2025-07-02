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
        const data = req.body
        const newUser = new User(data)
        return newUser.create()
    }
}

export default authController;
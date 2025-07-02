import User from "../models/User.js";
import apiController from "./apiController.js";

const authController = {
    getAllUser: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    },

    getUserById: async (req, res) => {
            const id = parseInt(req.params.id);
            const result = await User.findById(id)
            // Au choix on récupère le tableau d'objet de notre réponse
            return res.status(200).json(result)
            // Ou l'objet directement
            // return res.status(200).json(result[0])

    },

    createNewUser: async (req, res) => {
        console.log(req.body)
    }
}

export default authController;
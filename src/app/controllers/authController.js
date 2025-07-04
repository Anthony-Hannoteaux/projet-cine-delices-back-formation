import User from "../models/User.js"
import bcrypt from "bcrypt";

const authController = {
    login: async (req, res) => {
        try {
            // Nous commençons par vérifier si l'email est présent dans notre BDD
            const user = await User.findByEmail(req.body.email)
            // Si aucun n'utilisateur n'a été créé avec cet email alors
            if (!user) {
                // Message générique pour ne pas indiquer plus de précisions sur la donnée incorrecte 
                return res.status(404).json({ message: "Couple identifiant/mot de passe incorrectes"})
            }
            const passwordMatched = await bcrypt.compare(req.body.password, user.password);
            console.log(passwordMatched)
            if (!passwordMatched) {
                return res.status(404).json({ message: "Couple identifiant/mot de passe incorrectes"})
            }
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },
}

export default authController;
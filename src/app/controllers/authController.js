import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

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
            if (!passwordMatched) {
                return res.status(404).json({ message: "Couple identifiant/mot de passe incorrectes"})
            }
            /**
             * Génération d'un token d'authentification avec 
             * Pour plus de précision sur la construction d'un token JWT :
             * @link https://www.npmjs.com/package/jsonwebtoken
             */

            /**
             * Syntaxe du token
             * On fait appel à la méthode sign pour initialiser notre toker
             * On y ajoute le payload, qui sera l'objet stocké dans notre token
             * Ensuite la clé secrète
             * Suivie d'un objet qui représentera nos options, ici l'expiration du token
             */
            const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "4h" });
            return res.status(200).json({ token })
        } catch (error) {
            return res.status(500).json({ message: "Erreur serveur" })
        }
    },
}

export default authController;
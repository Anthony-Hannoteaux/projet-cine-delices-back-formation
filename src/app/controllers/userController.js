import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";


const userController = {
    // Route GET /api/users
    getAllUser: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: "Erreur interne du serveur." })
        }
    },

    // Route GET /api/users/email/:email
    getUserByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const result = await User.findByEmail(email);
            if (!result) {
                return res.status(404).json({ message: 'Aucune correspondance pour cette Email' })
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    // Route GET /api/users/id/:id
    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await User.findById(id);
            // Gestion d'erreur si result est false (donc pas d'utilisateur à cet ID)
            if (!result) {
                return res.status(404).json({ message: 'Aucune correspondance pour cette ID' })
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    // Route GET /api/users/me
    getMe: async (req, res) => {
        try {
            // On récupère l'ID de l'utilisateur authentifié depuis le token JWT
            const userId = req.user.id;
            // On utilise la méthode findById pour récupérer l'utilisateur
            const user = await User.findById(userId);
            // Si l'utilisateur n'existe pas, on renvoie une erreur 404
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            console.log("🔍 ID utilisateur reçu :", userId);

            let publication_count = 0;
            try {
            publication_count = await Recipe.countByUserId(userId);
            } catch (err) {
            console.log("Nombre de publications :", publication_count);
            console.error("Erreur lors du comptage des publications :", err);
            }


            // On renvoie les informations de l'utilisateur
            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
                publication_count
            });
        } catch (error) {
            // En cas d'erreur, on renvoie une erreur 500
            return res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    // Route POST /api/users
    createNewUser: async (req, res) => {
        try {
            // On replace par notre méthode findByEmail, plus approprié
            const userByEmail = await User.findByEmail(req.body.email)
            if (userByEmail) {
                return res.status(409).json({ message: "Email déjà utilisé pour la création d'un compte" })
            }
            /**
             *  On définit nos options qui représenterons nos critères de validation de mot de passe
             *  Au moins 12 caractères et 4 types différents
             *  Pour plus d'informations :
             *  @link https://www.cnil.fr/fr/mots-de-passe
             */
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
            if (!validator.isStrongPassword(req.body.password, options)) {
                return res.status(409).json({ message: "Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial" })
            }
            // Si mot de passe valide on le hache
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                created_at: new Date()
            })
            await newUser.create()
            return res.status(201).json("Nouvel utilisateur enregistré avec succès")
        }
        catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
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
                return res.status(404).json({ message: 'Aucune correspondance pour cette ID' })
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
                return res.status(409).json({ message: 'Erreur lors de la mise à jour des informations utilisateur.' })
            }
            res.status(200).json("Mise à jour du profil utilisateur effectuée.")
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    // Route DELETE /api/users/:id
    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.findById(id);
            if (user === undefined) {
                return res.status(404).json({ message: 'Aucune correspondance pour cette ID' })
            }
            const deletedUser = new User(user)
            const rowCounts = await deletedUser.delete()
            if (rowCounts === 0) {
                return res.status(409).json({ message: "Erreur lors de la supression de l'utilisateur." })
            }
            return res.status(200).json("Suppression de l'utilisateur effectuée.")
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' })
        }
    }
}

export default userController;
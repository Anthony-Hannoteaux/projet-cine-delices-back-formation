// Import du client pg, nous permettant de réaliser nos requêtes SQL sur notre BDD
import client from "../database.js";
import validator from "validator";

class User {
    // Initialisation des propriétés privées
    #username;
    #email;
    #password;

    constructor(config) {
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
    }

    // Initialisation des getters (accesseurs) des propriétés privées
    get username() {
        return this.#username;
    }
    
    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // Initialisation des setters (mutateurs) des propriétés privées
    set username(value) {
        // Le nom d'utilisateur doit être une chaîne de caractère non vide
        if (typeof value !== "string" && value.lenght > 0) {
            throw new Error("Le nom d'utilisateur doit être une chaîne de caractère non vide.")
        }
        this.#username = value;
    }
    
    set email(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Veuillez renseigner un email valide.");
        }
        this.#email = value;
    }

    set password(value) {
        if(!value) {
            throw new Error("Mot de passe invalide.")
        }
        this.#password = value;
    }

    // Mise en place du CRUD grâce au design pattern "Active Record"

    // CREATE
    create() {
        const result = client.query(`
            INSERT INTO "user"
            ("username", "email", "password")
            VALUES ($1, $2, $3);`, [
                this.username,
                this.email,
                this.password
            ])

            return result.rowCount;
    }
    
    // READ
    static async findAll() {
        const result = await client.query(`SELECT * FROM "user"`);
        console.log(result.rows)
    }
}

// Premier test d'initialisation d'instance d'un objet User
const newUser = {
    username: "John Doe",
    email: "johndoe@mail.com",
    password: "superpassword"
}

const userTest = new User(newUser);

// Premier Test d'affichage de tout les utilisateurs
// User.findAll()
// console.log(userTest.username, userTest.email, userTest.password)
/**
 * Utilisateur créer grâce à la fonction create du CRUD
 * Mise en commentaire pour ne pas recréer le même utilisateur à chaque test
 * Car erreur du à la duplication de clé
 */
// userTest.create()
User.findAll()
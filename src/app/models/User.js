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
        // Vérification des contraintes grâce au package validator
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
    /**
     * Création d'une méthode d'instance
     * Création d'une nouvelle entrée grâce aus valeurs de l'instance
     */
    create() {
        /**
         * On fait appel à la méthode query de la notre client pg
         * Pour rédiger notre requêtes SQL
         */
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
    /**
     * Création d'une méthode statique qui sera appellé via notre classe
     * Affichage de l'ensemble de nos entrées de l'entité "user"
     */
    static async findAll() {
        const result = await client.query(`SELECT * FROM "user"`);
        return result.rows
    }
}

// Test d'initialisation d'instance d'un objet User
const newUser = {
    password: "superpassword",
    email: "johndoe@mail.com",
    username: "John Doe",
}

const userTest = new User(newUser);

// Premier Test d'affichage de tout les utilisateurs
// User.findAll()
// console.log(userTest.username, userTest.email, userTest.password)
/**
 * Utilisateur créer grâce à la fonction create du CRUD
 * Mise en commentaire pour ne pas recréer le même utilisateur à chaque test
 */
// userTest.create()

// Test de notre fonction de lecture
User.findAll()
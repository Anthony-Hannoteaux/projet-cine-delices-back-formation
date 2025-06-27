import validator from "validator";
import client from "../database.js";
// initialisation de la classe User
class User {
    // initialisation des propriétés privées
    #username;
    #email;
    #password;

    constructor(config) {
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
    }
    // mise en place des getteurs
    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // mise en place des setteurs (mutateurs)
    set username(value) {
        if (value.length > 32 || value.length < 1) {
            throw new Error("Votre nom d'utilisateur doit contenir entre 1 et 32 caractères");
        }
        this.#username = value;
    }

    set email(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Le format d'email n'est pas valide");
        }
        this.#email = value;
    }

    set password(value) {
        this.#password = value;
    }

    // mise en place du CRUD via le design pattern active record
    async create() {
        const result = await client.query(`INSERT INTO "user"
            (username, email, password)
            VALUES ($1, $2, $3)`, [
                this.#username,
                this.#email,
                this.#password
            ])
            return result.rowCount
    }
}

const user1 = {
    username: "John Doe",
    email: "johndoe@mail.com",
    password: "password"
}
const userTest = new User(user1);

userTest.create()
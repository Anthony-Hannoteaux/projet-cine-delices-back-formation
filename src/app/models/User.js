import validator from "validator";
import client from "../database.js";
// initialisation de la classe User
class User {
    // initialisation des propriétés privées
    #username;
    #email;
    #password;
    #id;

    constructor(config) {
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
        this.id = config.id;

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

    get id() {
        return this.#id;
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
    set id(value) {
        this.#id = value;
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
    // affiche l'ensemble des enregistrements de la table user
    static async findAll() {
        const result = await client.query(`SELECT * FROM "user";`)
        return result.rows
    }
    // affiche l'enregistrement de l'id spécifié
    static async findById(id) {
        const result = await client.query(`SELECT * FROM "user"
            WHERE id = $1`, [
            id
        ]);
        return result.rows;
    }

    // modification
    async update() {
        const result = await client.query(`UPDATE "user"
            SET
            "username" = $1,
            "email" = $2,
            "password" = $3
            WHERE "id"= $4`, [
            this.#username,
            this.#email,
            this.#password,
            this.#id
        ])
        return result.rowCount;
    }
};

const user1 = {
    username: "John Doe",
    email: "johndoe@mail.com",
    password: "password"
}

const thisUser = await User.findById(4)
// console.log(thisUser)
// console.log(thisUser[0])
const updateUser = new User (thisUser[0]);
// console.log(updateUser.id)

updateUser.username = "Anthony";
console.log(updateUser.username);

updateUser.update();
import validator from "validator";
import client from "../database.js";
// initialisation de la classe User
class User {
    // initialisation des propriétés privées
    #id;
    #username;
    #email;
    #password;
    #is_active;

    constructor(config) {
        this.id = config.id;
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
        this.is_active = config.is_active;
    }

    // mise en place des getters
    get id() {
        return this.#id;
    }

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get is_active() {
        return this.#is_active;
    }


    // mise en place des setteurs (mutateurs)
    set id(value) {
        this.#id = value;
    }

    set username(value) {
        if (typeof value !== "string" && (value.length > 32 || value.length < 1)) {
            throw new Error("Votre nom d'utilisateur doit obligatoirement être une chaîne de caractère entre 1 et 32.");
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

    set is_active(value) {
        this.#is_active = value;
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
        return result.rows[0];
    }

    // affiche l'enregistrement de l'email spécifié
    static async findByEmail(email) {
        const result = await client.query(`SELECT * FROM "user"
            WHERE email = $1`, [
            email
        ]);
        return result.rows[0];
    }

    // modification
    async update() {
        try {
            const result = await client.query(`UPDATE "user"
            SET
                "username" = $1,
                "email" = $2,
                "password" = $3,
                "is_active" = $4
            WHERE "id"= $5`, [
                this.#username,
                this.#email,
                this.#password,
                this.#is_active,
                this.#id
            ])
            return result.rowCount;
        } catch (error) {
            console.error("Erreur SQL UPDATE :", error);
            throw error;
        }
    }

    // suppression d'un enregistrement à partir de l'id
    async delete() {
        try {
            const result = await client.query(
                `DELETE FROM "user" WHERE "id" = $1`,
                [this.#id]
            );
            return result.rowCount;
        } catch (error) {
            console.error("Erreur SQL lors de la suppression :", error);
            throw error;
        }
    }
};

export default User;
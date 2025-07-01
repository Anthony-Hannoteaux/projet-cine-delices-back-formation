import client from "../database.js";

// initialisation de la classe Movie
class Movie {
    // initialisation des propriétés privées
    #id;
    #TMDB_id;
    #title;
    #overview;
    #poster_path;
    #media_type;

    constructor(config) {
        this.id = config.id;
        this.TMDB_id = config.TMDB_id;
        this.title = config.title;
        this.overview = config.overview;
        this.poster_path = config.poster_path;
        this.media_type = config.media_type;
    }

    // mise en place des getters
    get id() {
        return this.#id;
    }
    get TMDB_id() {
        return this.#TMDB_id;
    }

    get title() {
        return this.#title;
    }

    get overview() {
        return this.#overview;
    }

    get poster_path() {
        return this.#poster_path;
    }

    get media_type() {
        return this.#media_type;
    }

    // mise en place des setteurs (mutateurs)
    set id(value) {
        this.#id = value;
    }

    set TMDB_id(value) {
        if(value === Movie.TMDB_id) {
            throw new Error ("Ce film existe déjà")
        }
        this.#TMDB_id = value;
    }

    set title(value) {
        this.#title = value;
    }

    set overview(value) {
        this.#overview = value;
    }

    set poster_path(value) {
        this.#poster_path = value;
    }

    set media_type(value) {
        if (value === !"movie" && value === !"tv") {
            throw new Error ("Le media doit être de type 'movie' ou 'tv'")
        }
        this.#media_type = value;
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

    // suppression d'un enregistrement à partir de l'id
    async delete() {
        const result = await client.query(`DELETE FROM "user"
            WHERE "id" = $1`, [
            this.#id
        ])
        return result.rowCount;
    }
};

export default User;
import client from "../database.js";

// initialisation de la classe Movie
class Movie {
    // initialisation des propriétés privées
    #TMDB_id;
    #title;
    #overview;
    #poster_path;
    #media_type;
    #id;


    constructor(config) {
        this.TMDB_id = config.TMDB_id;
        this.title = config.title;
        this.overview = config.overview;
        this.poster_path = config.poster_path;
        this.media_type = config.media_type;
        this.id = config.id;

    }

    // mise en place des getters

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

    get id() {
        return this.#id;
    }

    // mise en place des setteurs (mutateurs)

    set TMDB_id(value) {
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
        // if (value != "movie" && value != "tv") {
        //     throw new Error("Le media doit être de type 'movie' ou 'tv'")
        // }
        this.#media_type = value;
    }

    set id(value) {
        this.#id = value;
    }

    // mise en place du CRUD via le design pattern active record
    async create() {
        const result = await client.query(`INSERT INTO "movie"
            ("TMDB_id", "title", "overview", "poster_path", "media_type")
            VALUES ($1, $2, $3, $4, $5)`, [
            this.#TMDB_id,
            this.#title,
            this.#overview,
            this.#poster_path,
            this.#media_type
        ])

        // retourne le nombre d'enregistrements créés
        return result.rowCount
    }
    // affiche l'ensemble des enregistrements de la table movie
    static async findAll() {
        const result = await client.query(`SELECT * FROM "movie";`)
        return result.rows
    }
    // affiche l'enregistrement de l'id spécifié
    static async findById(id) {
        const result = await client.query(`SELECT * FROM "movie"
            WHERE id = $1`, [
            id
        ]);
        return result.rows;
    }

    // modification
    async update() {
        const result = await client.query(`UPDATE "movie"
            SET
            "TMDB_id" = $1,
            "title" = $2,
            "overview" = $3,
            "poster_path" = $4,
            "media_type" = $5
            WHERE "id"= $6`, [
            this.#TMDB_id,
            this.#title,
            this.#overview,
            this.#poster_path,
            this.#media_type,
            this.#id
        ])

        // retourne le nombre d'enregistrements modifiés (nombre de lignes)
        return result.rowCount;
    }

    // suppression d'un enregistrement à partir de l'id
    async delete() {
        const result = await client.query(`DELETE FROM "movie"
            WHERE "id" = $1`, [
            this.#id
        ])
        // retourne le nombre d'enregistrements supprimés
        return result.rowCount;
    }
}

export default Movie;;
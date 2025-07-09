import client from "../database.js";

// initialisation de la classe Movie
class Genre {
    // initialisation des propriétés privées
    #name;
    #id;


    constructor(config) {
        this.name = config.name;
        this.id = config.id;

    }

    // mise en place des getters
    get name() {
        return this.#name;
    }

    get id() {
        return this.#id;
    }

    // mise en place des setteurs (mutateurs)

    set name(value) {
        this.#name = value;
    }

    set id(value) {
        this.#id = value;
    }

    // mise en place du CRUD via le design pattern active record
    async create() {
        const result = await client.query(`INSERT INTO "genre"
            ("name")
            VALUES ($1)`, [
            this.#name
        ])

        // retourne le nombre d'enregistrements créés
        return result.rowCount
    }
    // affiche l'ensemble des enregistrements de la table movie
    static async findAll() {
        const result = await client.query(`SELECT * FROM "genre";`)
        return result.rows
    }
    // affiche l'enregistrement de l'id spécifié
    static async findById(id) {
        const result = await client.query(`SELECT * FROM "genre"
            WHERE id = $1`, [
            id
        ]);
        return result.rows;
    }

    // modification
    async update() {
        const result = await client.query(`UPDATE "genre"
            SET
            "name" = $1
            WHERE "id"= $2`, [
            this.#name,
            this.#id
        ])

        // retourne le nombre d'enregistrements modifiés (nombre de lignes)
        return result.rowCount;
    }

    // suppression d'un enregistrement à partir de l'id
    async delete() {
        const result = await client.query(`DELETE FROM "genre"
            WHERE "id" = $1`, [
            this.#id
        ])
        // retourne le nombre d'enregistrements supprimés
        return result.rowCount;
    }
}

export default Genre;
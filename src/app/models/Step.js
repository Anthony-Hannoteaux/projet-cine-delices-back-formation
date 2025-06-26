import slugify from "slugify";
import client from "../database.js";

class Step {
    id;
    number;
    description;
    recipe;

    constructor(id, number, description, recipe) {
        this.id = id;
        this.number = number;
        this.description = description;
        this.recipe = recipe;
    }
    //Create()
    // ajouter un objet dans la base
    async create() {
        const result = await client.query(`INSERT INTO step
            (number, description, recipe_id)
            VALUES ($1, $2, $3);`, [
            this.number,
            this.description,
            this.recipe.id
        ]);
        // retourne le nombre d'enregistrements créés
        return result.rowCount;
    }
    //FindAll()
    // recherche tous les objets dans la base
    static async findAll() {
        const result = await client.query(`SELECT * FROM step;`);
        // retourne les lignes trouvées
        return result.rows
    }

    // FindById()
    // recherche un objet par son id dans la base
    static async findById(id) {
        const result = await client.query(`SELECT * FROM step WHERE id = $1;`, [id]);
        // vérifie si une ligne a été trouvée
        const stepData = result.rows[0];
        if (!stepData) {
            throw new Error(`Aucune étape trouvée avec l'ID ${id}`);
        }
        // retourne une instance de la classe Step avec les données récupérées
        return new Step(
            stepData.id,
            stepData.number,
            stepData.description,
            { id: stepData.recipe_id } // Référence à la recette
        );
    }

    // Update()
    // mise à jour d'un objet dans la base
    async update() {
        const result = await client.query(`UPDATE step
            SET
            "number" = $1,
            "description" = $2,
            "recipe_id" = $3
            WHERE "id" = $4;`, [
            this.number,
            this.description,
            this.recipe.id,
            this.id
        ]);
        // retour du nombre d'enregistrements créés
        return result.rowCount;
    }

    // Delete()
    // suppression d'un objet dans la base
    async delete() {
        const result = await client.query(`DELETE FROM step WHERE`)
    }
}

    // exporte la classe Step pour l'utiliser dans d'autres fichiers
export default Step;
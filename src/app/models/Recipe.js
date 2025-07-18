import client from '../../app/database.js';

class Recipe {
    // Attributs de la classe Recipe
    #id;
    #title;
    #description;
    #difficulty;
    #budget;
    #servings;
    #preparation_time;
    #cook_time;
    #steps;
    #story;
    #picture;
    #user_id;
    #movie_id;
    #average_rating;


    constructor(id, title, description, difficulty, budget, servings, preparation_time, cook_time, steps, story, picture, user_id, movie_id, average_rating) {
        // Initialisation des attributs de la classe Recipe
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.budget = budget;
        this.servings = servings;
        this.preparation_time = preparation_time;
        this.cook_time = cook_time;
        this.steps = steps;
        this.story = story;
        this.picture = picture;
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.average_rating = average_rating;
    }

    toJSON() {
        // Méthode pour convertir l'instance de la classe Recipe en objet JSON (sinon les données ne seront pas sérialisées correctement)
        return {
        id: this.id,
        title: this.title,
        description: this.description,
        difficulty: this.difficulty,
        budget: this.budget,
        servings: this.servings,
        preparation_time: this.preparation_time,
        cook_time: this.cook_time,
        steps: this.steps,
        story: this.story,
        picture: this.picture,
        user_id: this.user_id,
        movie_id: this.movie_id,
        average_rating: this.average_rating,
        };
    }

    // Getters pour accéder aux attributs privés
    get id() {
        return this.#id;
    }
    // Setters pour modifier les attributs privés
    set id(value) {
        this.#id = value;
    }

    // Getter et setter pour accéder au titre
    get title() {
        return this.#title;
    }
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Le titre doit être une chaîne de caractères non vide.');
        }
        this.#title = value;
    }

    // Getter et setter pour la description
    get description() {
        return this.#description;
    }
    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('La description doit être une chaîne de caractères non vide.');
        }
        this.#description = value;
    }

    // Getters et setters pour la difficulté
    get difficulty() {
        return this.#difficulty;
    }
    set difficulty(value) {
        this.#difficulty = value;
    }

    // Getters et setters pour le budget
    get budget() {
        return this.#budget;
    }
    set budget(value) {
        this.#budget = value;
    }

    // Getters et setters pour les portions
    get servings() {
        return this.#servings;
    }
    set servings(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Le nombre de portions doit être un nombre positif.');
        }
        this.#servings = value;
    }

    // Getters et setters pour les temps de préparation
    get preparation_time() {
        return this.#preparation_time;
    }
    set preparation_time(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Le temps de préparation doit être un nombre positif ou zéro.');
        }
        this.#preparation_time = value;
    }

    // Getters et setters pour les temps de cuisson
    get cook_time() {
        return this.#cook_time;
    }
    set cook_time(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Le temps de cuisson doit être un nombre positif ou zéro.');
        }
        this.#cook_time = value;
    }

    // Getters et setters pour les étapes de la recette
    get steps() {
        return this.#steps;
    }
    set steps(value) {
        this.#steps = value;
    }

    // Getters et setters pour l'anecdote liée au film
    get story() {
        return this.#story;
    }
    set story(value) {
        this.#story = value;
    }

    // Getters et setters pour la photo de la recette
    get picture() {
        return this.#picture;
    }
    set picture(value) {
        this.#picture = value;
    }

    // Getters et setters pour l'ID de l'utilisateur
    get user_id() {
        return this.#user_id;
    }
    set user_id(value) {
        this.#user_id = value;
    }

    //Getters et setters pour l'ID du film
    get movie_id() {
        return this.#movie_id;
    }
    set movie_id(value) {
        this.#movie_id = value;
    }

    // Getters et setters pour la note moyenne
    get average_rating() {
        return this.#average_rating;
    }
    set average_rating(value) {
        this.#average_rating = value;
    }


    // Ajout d'une recette dans la base de données
    // Méthode asynchrone pour créer une recette
    // Utilisation de la méthode db.query pour insérer les données dans la table "recipes"
    // Les paramètres de la requête sont passés sous forme de tableau
    async create() {
    try {
        // 1. Insérer la recette
        const result = await client.query(
        `INSERT INTO recipe (title, description, difficulty, budget, servings, preparation_time, cook_time, story, picture, user_id, movie_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id`,
        [
            this.title,
            this.description,
            this.difficulty,
            this.budget,
            this.servings,
            this.preparation_time,
            this.cook_time,
            this.story,
            this.picture,
            this.user_id,
            this.movie_id
        ]
        );

        const recipeId = result.rows[0].id;

        // 2. Insérer les étapes
        if (this.steps && Array.isArray(this.steps)) {
        for (let i = 0; i < this.steps.length; i++) {
            await client.query(
            `INSERT INTO step (content, position, recipe_id) VALUES ($1, $2, $3)`,
            [this.steps[i], i + 1, recipeId]
            );
        }
        }

        return recipeId;
    } catch (error) {
        console.error("Erreur createRecipe:", error);
        throw error;
    }
    }


    // Méthode pour trouver toutes les recettes
    // Méthode asynchrone pour récupérer toutes les recettes
    // Utilisation de la méthode client
    // .query pour sélectionner les données de la table "recipes"
    static async findAll() {
          const result = await client.query(`
            SELECT
            recipe.*,
            "user"."username" AS author_username
            FROM "recipe"
            JOIN "user" ON "user"."id" = recipe."user_id"
            ORDER BY recipe.created_at DESC
        `);
        // Retourne un tableau d'instances de la classe Recipe
        return result.rows;
    }

    // Méthode statique pour trouver une recette par son ID
    static async findById(id) {
  /**
   * Cette requête récupère une recette complète par son ID.
   * Elle inclut :
   * - Toutes les colonnes de la table `recipe`
   * - Les informations de l'utilisateur qui a créé la recette (`username`, `email`)
   * - Les étapes de préparation, agrégées en un tableau JSON
   * - La note moyenne calculée dynamiquement à partir de `rating_sum` et `rating_count`
   */
  const result = await client.query(`
    SELECT recipe.*, "user".username, "user".email,
      json_agg(json_build_object('number', step.number, 'description', step.description)) AS steps,
      CASE
        WHEN recipe.rating_count = 0 THEN 0
        ELSE ROUND(recipe.rating_sum::numeric / recipe.rating_count, 2)
      END AS average_rating
    FROM recipe
    JOIN "user" ON recipe.user_id = "user".id
    LEFT JOIN step ON recipe.id = step.recipe_id
    WHERE recipe.id = $1
    GROUP BY recipe.id, "user".username, "user".email
  `, [id]);

        // Vérifie si une recette a été trouvée
        const recipeData = result.rows[0];
        console.log(recipeData);

        if (!recipeData) {
            throw new Error(`Recette avec l'ID ${id} non trouvée.`);
        }

        //Retourne une instance de la classe Recipe avec les données récupérées
        return new Recipe(
            recipeData.id,
            recipeData.title,
            recipeData.description,
            recipeData.difficulty,
            recipeData.budget,
            recipeData.servings,
            recipeData.preparation_time,
            recipeData.cook_time,
            recipeData.steps,
            recipeData.story,
            recipeData.picture,
            recipeData.user_id,
            recipeData.movie_id,
            recipeData.average_rating
        );
    }

    // Méthode pour mettre à jour une recette
    async update() {
        const result = await client.query(`
    UPDATE "recipe"
    SET title = $1,
        description = $2,
        difficulty = $3,
        budget = $4,
        servings = $5,
        preparation_time = $6,
        cook_time = $7,
        story = $8,
        picture = $9,
        user_id = $10,
        movie_id = $11
    WHERE id = $12
  `, [
            this.title,
            this.description,
            this.difficulty,
            this.budget,
            this.servings,
            this.preparation_time,
            this.cook_time,
            this.story,
            this.picture,
            this.user_id,
            this.movie_id,
            this.id
        ]);

        return result.rowCount;
    }


    // Méthode pour supprimer une recette
    async delete() {
        const result = await client.query(`DELETE FROM "recipe"
            WHERE "recipe"."id" = $1`, [this.id]);
        
        // Retourne le nombre de lignes supprimées
        return result.rowCount;
    }

    static async countByUserId(userId) {
        const query = `SELECT COUNT(*) FROM recipe WHERE user_id = $1`;
        const result = await client.query(query, [userId]);
        return parseInt(result.rows[0].count, 10);
    }

    static async findLastPublicationDateByUserId(userId) {
        const query = `
            SELECT created_at
            FROM recipe
            WHERE user_id = $1
            ORDER BY created_at DESC
            LIMIT 1
        `;
        const result = await client.query(query, [userId]);
        return result.rows[0]?.created_at || null;
    }

    static async getAverageRatingByUserId(userId) {
        const query = `
            SELECT
            CASE
                WHEN SUM(recipe.rating_count) = 0 THEN 0
                ELSE ROUND(SUM(recipe.rating_sum)::numeric / SUM(recipe.rating_count), 2)
            END AS average_rating
            FROM recipe
            WHERE recipe.user_id = $1
        `;
        const result = await client.query(query, [userId]);
        console.log("Résultat brut de la requête :", result);
        return parseFloat(result.rows[0].average_rating);
        }

}

// Exportation de la classe Recipe pour l'utiliser dans d'autres fichiers
export default Recipe;
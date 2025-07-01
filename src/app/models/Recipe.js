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
    #story;
    #picture;
    #user_id;
    #movie_id;


    constructor(id, title, description, difficulty, budget, servings, preparation_time, cook_time, story, picture, user_id, movie_id) {
        // Initialisation des attributs de la classe Recipe
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.budget = budget;
        this.servings = servings;
        this.preparation_time = preparation_time;
        this.cook_time = cook_time;
        this.story = story;
        this.picture = picture;
        this.user_id = user_id;
        this.movie_id = movie_id;
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

    // Getters et setters pour l'anecdote liée au film
    get story() {
        return this.#story;
    }
    set story(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('L\'histoire doit être une chaîne de caractères non vide.');
        }
        this.#story = value;
    }

    // Getters et setters pour la photo de la recette
    get picture() {
        return this.#picture;
    }
    set picture(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('La photo doit être une chaîne de caractères non vide.');
        }
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


    // Ajout d'une recette dans la base de données
    // Méthode asynchrone pour créer une recette
    // Utilisation de la méthode db.query pour insérer les données dans la table "recipes"
    // Les paramètres de la requête sont passés sous forme de tableau
    async create() {
        const result = await client.query('INSERT INTO recipe (title, description, difficulty, budget, servings, preparation_time, cook_time, story, picture, user_id, movie_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
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

        // Retourne le nombre d'enregistrements insérés
        return result.rowCount;
    }

    // Méthode pour trouver toutes les recettes
    // Méthode asynchrone pour récupérer toutes les recettes
    // Utilisation de la méthode client
    // .query pour sélectionner les données de la table "recipes"
    static async findAll() {
        const result = await client.query(`SELECT * FROM "recipe"`);
        // Retourne un tableau d'instances de la classe Recipe
        return result.rows;
    }


    // Retourne une recette par son ID
    // Méthode asynchrone pour récupérer une recette par son ID
    // Utilisation de la méthode client
    // .query pour sélectionner les données de la table "recipes"
    // Le paramètre de la requête est passé sous forme de tableau
    static async findById(id) {
        const result = await client.query(`SELECT * FROM recipe
            JOIN "user" ON "recipe"."user_id" = "user"."id"
            WHERE "recipe"."id" = $1`, [id]);

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
            recipeData.story,
            recipeData.picture,
            recipeData.user_id,
            recipeData.movie_id
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
}

// Exportation de la classe Recipe pour l'utiliser dans d'autres fichiers
export default Recipe;
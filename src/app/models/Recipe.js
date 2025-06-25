class Recipe {
    // Attributs de la classe Recipe
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


    constructor(id, title, description, difficulty, budget, servings, preparation_time, cook_time, story, picture, user_id) {
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
    }


        // Getters pour accéder aux attributs privés
    get title() {
        return this.#title;
    }
        // Setters pour modifier les attributs privés
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Le titre doit être une chaîne de caractères non vide.');
        }
        this.#title = title;
    }


    get description() {
        return this.#description;
    }   
    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('La description doit être une chaîne de caractères non vide.');
        }
        this.#description = value;
    }

    get difficulty() {
        return this.#difficulty;
    }
    set difficulty(value) {
        this.#difficulty = value;
    }

    get budget() {
        return this.#budget;
    }
    set budget(value) {
        this.#budget = value;
    }

    get servings() {
        return this.#servings;
    }
    set servings(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Le nombre de portions doit être un nombre positif.');
        }
        this.#servings = value;
    }

    get preparation_time() {
        return this.#preparation_time;
    }
    set preparation_time(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Le temps de préparation doit être un nombre positif ou zéro.');
        }
        this.#preparation_time = value;
    }

    get cook_time() {
        return this.#cook_time;
    }
    set cook_time(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Le temps de cuisson doit être un nombre positif ou zéro.');
        }
        this.#cook_time = value;
    }

    get story() {
        return this.#story;
    }
    set story(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('L\'histoire doit être une chaîne de caractères non vide.');
        }
        this.#story = value;
    }

    get picture() {
        return this.#picture;
    }
    set picture(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('La photo doit être une chaîne de caractères non vide.');
        }
        this.#picture = value;
    }

    get user_id() {
        return this.#user_id;
    }
    set user_id(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('L\'ID de l\'utilisateur doit être un nombre positif.');
        }
        this.#user_id = value;
    }
}

// Exportation de la classe Recipe pour l'utiliser dans d'autres fichiers
export default Recipe;

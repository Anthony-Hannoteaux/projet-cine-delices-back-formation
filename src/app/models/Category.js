// import de client depuis database
import client from "../database.js";

// classe category qui représentra un modèle pour la table category (entrées, plats, desserts, etc)
// à laquelle on déclare une propriété privée (#) name
class Category {
  #id;
  #name;


  // création d'instance de notre classe Catagory grâce au constructeur avec pour argument name
  constructor(config) {
    this.id = config.id;
    // on vérifie que la propriété name est différente de undefined pour éviter les erreurs
    // pour nous permettre de ne pas appeler le setter avec une valeur undefined
    if (config.name !== undefined) {
      this.name = config.name;
    }
  }
  // utilisation de getter pour récupérer la valeur de la propriété name
  get name() {
    return this.#name;
  }
  // utilisation de setter pour modifier la valeur de la propriété name
  set name(value) {
    // mise en place d'une condition : si la valeur n'est pas une chaine de caractères alors je renvoie une erreur
    if (typeof value !== "string") {
      throw new Error(`"${value}" n'est pas une chaîne de caractère`);
    }
    // si la valeur correspond bien à une chîne de caractère alors je renvoie la valeur de name
    return this.#name = value;
  }

  get id() {
    return this.#id;
  }
  set id(value) {
    return this.#id = value;
  }

  // Méthode CRUD (Create, Read, Update, Delete)

  // static = on accède depuis la classe, on passe pas par l'instance

  // CREATE : Création d'une catégorie
  async create() {
    // le résultat de la requête qui sera dans notre variable result
    const result = await client.query(
      // on insert une nouvelle categorie dans la table category
      // avec comme paramètre de sécurité $1 pour éviter les injections SQL (obligatoire)
      `INSERT INTO category ("name") VALUES ($1);`,
      // on assigne cette nouvelle valeur à name
      [this.#name]
    );
    // nous renvoie un tableau d'objet qui contenant résultat
    return result.rowCount;
  }

  // READ : Lecture d'une catégorie
  // pour toutes les catégories
  static async findAll() {
    const result = await client.query(`SELECT * FROM "category";`);
    return result.rows;
  }
  // pour une catégorie spécifique via son id
  static async findById(id) {
    const result = await client.query(`SELECT * FROM category WHERE id = $1`, [
      id,
    ]);
    // console.log(result.rows);
    return result.rows;
  }

  // UPDATE : mise à jour d'une catégorie
  async update() {
    const result = await client.query(
      `UPDATE category SET name = $1 WHERE id = $2`,
      [this.#name, this.#id]
    );
    return result.rows;
  }

  // DELETE : suppression d'une catégorie
  async delete() {
    const result = await client.query(`DELETE FROM category WHERE id = $1`, [
      this.#id,
    ]);
    return result.rowCount;
  }
}

// const categoryTest = new Category(11, "youssef");
// console.log(categoryTest.id, categoryTest.name);

// categoryTest.name = "jul";
// console.log(categoryTest.name);

// TEST

// CREATE
// categoryTest.create();
// console.log(categoryTest.name);

// READ
// Category.findAll();
// console.log(categoryTest);

// const test = await Category.findById(1);
// console.log(test);

// UPDATE
// categoryTest.name = "Sarah";
// categoryTest.update();
// console.log(categoryTest.name);

//DELETE
// categoryTest.delete();

export default Category;

// import de client depuis database
import client from "../database.js";

// classe category qui représentra un modèle pour la table category (les entrées, plats, desserts, etc)
// à laquelle on déclare 2 propriétés (id et name)
class Category {
  #name;

  // création d'instance de notre classe Catagory grâce au constructeur avec pour arguments id et name
  constructor(name) {
    this.name = name;
  }
get name() {
  return this.#name;
}
set name(value) {
  this.#name = value;
}
  // Méthode CRUD (Create, Read, Update, Delete)

  // CREATE : méthode statique pour créer une nouvelle catégorie
  // on donne name comme paramètre, pas besoin de l'id puisqu'il sera auto-incrémenté
  async create(name) {
    // execution de la requête SQL pour insérer une nouvelle ligne dans la table category
    const result = await client.query(
      // insert la valeur de $1 dans la colonne name puis le retourne
      // puis renvoie l'id auto-incrémenté et le nom
      `INSERT INTO category (name) VALUES ($1) RETURNING id, name;`,
      [name]
    );
    // nous renvoie un tableau d'objet qui contenant résultat
    return result.rows[0];
  }

  // READ : récupération d'une catégorie via son id
  // static async findById(id) {
  //   const result = await client.query(`SELECT * FROM category WHERE id = $1`, [
  //     id,
  //   ]);
  //   const category = result.rows[0];

  //   if (!category) {
  //     throw new Error(`La catégorie avec l'id ${id} est introuvable.`);
  //   }
  //   return category;
  // }

  static async findAll() {
    const result = await client.query(`SELECT * FROM "category";`);
    console.log(result);
  }

  // UPDATE : mise à jour d'une catégorie
  static async updateById(id, newName) {
    const result = await client.query(
      `UPDATE category SET name = $1 WHERE id = $2 RETURNING id, name`,
      [id, newName]
    );
    const updateCategory = result.rows[0];
    if (!updateCategory) {
      throw new Error(
        `Impossible de mettre à jour la catégorie car l'id ${id} est introuvable`
      );
    }
    return new Category(updateCategory.id, updateCategory.name);
  }

  // DELETE : suppression d'une catégorie
  static async deleteById(id) {
    const result = await client.query(
      `DELETE FROM category WHERE id = $1 RETURNING id`,
      [id]
    );
    if (result.rowCount === 0) {
      throw new Error(
        `Impossible de supprimer la catégorie car l'id ${id} est introuvable.`
      );
    }
    return `La catégorie avec l'id ${id} a bien été supprimée `;
  }
}

export default Category;

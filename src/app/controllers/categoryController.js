// import du modèle category
import Category from "../models/Category.js";

const categoryController = {
  // utilisation d'une fonction avec une méthode asynchrone pour créer une catégorie
  createCategory: async (req, res) => {
    try {
      // on récupère le corps de ma requête grâce à body
      const data = req.body;
     // on récupère toutes les catégories présentent dan
      const allCategory = await Category.findAll();

      // condition pour éviter les doublons
      // on parcourt chaque category présente dans notre table
      for (const category of allCategory) {
        // si le nom de la catégorie est déjà utilsé
        if (data.name === category.name) {
          // alors on renvoie un message d'erreur, status 409 : conflit
        return res.status(409).json('Cette catégorie existe déjà.');
      }
      }
      // // sinon on crée une nouvelle catégorie
      const newCategory = new Category(data);
      // // on utilise la méthode create pour cela
      const result = await newCategory.create();
      // // renvoie une réponse en json
      return res.json(result);
      // // si erreur
    } catch (error) {
      // console.log("Erreur lors de la création de la catégorie :", error);
      // alors on renvoie un status 500 (internal erreur servor) avec un message d'erreur
      return res.status(500).json("Impossible de créer de la catégorie.");
    }
  },

  // utilisation d'une fonction avec une méthode asynchrone pour récupérer toutes les catégories
  getAllCategory: async (req, res) => {
    try {
      // on utilise la méthode findAll pour trouver toutes les catégories
      const result = await Category.findAll();
      // renvoie une réponse en json
      return res.json(result);
      // si erreur
    } catch (error) {
      // console.log("Erreur lors de la récupération des catégories :", error);
      // alors on renvoie un status 500 avec un message d'erreur
      return res.status(500).json("Impossible de récupérer les catégories.");
    }
  },

  getCategoryById: async (req, res) => {
    try {
      // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
      const id = parseInt(req.params.id);
      // vérifie si l'id n'est pas un nombre valide via la fonction isNan
      if(isNaN(id)) {
        // si oui, alors renvoie un status 400 (bad request) avec un message d'erreur
        return res.status(400).json("Id non valide.");
      }
      // on recherche la categorie via son id
      const result = await Category.findById(id);
      // si différent de result, donc de l'id
      if(!result) {
        // on renvoie un status 404 (not found) avec un message d'erreur
        return res.status(404).json("Catégorié introuvable.");
      }
      // sinon on renvoie la nouvelle catégorie
      return res.json(result);
    } catch (error) {
      // console.log("Erreur lors de la récupération de la catégorie :", error);
      return res.status(500).json("Impossible de récupérer la catégorie.");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const data = req.body;
      const newCategory = new Category(data.name);
      const result = await newCategory.update();
      return res.json(result);
    } catch (error) {
      console.log("Erreur lors de la mise à jour de la catégorie :", error);
      return res.status(500).json("Impossible de mettre à jour la catégorie.");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const data = req.params;
      const newCategory = new Category(data.id, data.name);
      const result = await newCategory.delete();
      return res.json(result);
    } catch (error) {
      console.log("Erreur lors de la suppression de la catégorie :", error);
      return res.status(500).json("Impossible de supprimer la catégorie.");
    }
  },
};

export default categoryController;

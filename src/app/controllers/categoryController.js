// import du modèle category
import Category from "../models/Category.js";

const categoryController = {
  // utilisation d'une fonction avec une méthode asynchrone pour créer une catégorie
  createCategory: async (req, res) => {
    try {
      // console.log("Test de requête POST REQ.BODY :", req.body);
      // on récupère le corps de ma requête grâce à body
      const data = req.body;
      // console.log("Test de la requête POST :", data);
      // on créé une nouvelle instance de Category car ce n'est pas une méthode statique
      // appliquable pour la méthode create, update et delete 
      // passe null en argument au lieu de data.id car auto-incrémenté, plus de message d'erreur pour l'id mais le name maintenant
      
      // on check si la catégorie est déjà existante dans notre table
      const existingCategory = await Category.findAll(data.name);
      // si oui
      if (existingCategory) {
        // alors on renvoi un message d'erreur (status 409 : conflit)
        return res.status(409).json('Cette catégorie existe déjà.');
      }
      
      // sinon on crée une nouvelle catégorie
      const newCategory = new Category(data);
      // on utilise la méthode create pour cela
      const result = await newCategory.create();
      // renvoie une réponse en json
      return res.json(result);
      // si erreur
    } catch (error) {
      console.log("Erreur lors de la création de la catégorie :", error);
      // alors on renvoie un status 500 (erreur serveur) avec un message d'erreur
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
      console.log("Erreur lors de la récupération des catégories :", error);
      // alors on renvoie un status 500 avec un message d'erreur
      return res.status(500).json("Impossible de récupérer les catégories.");
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const result = await Category.findById();
      return res.json(result);
    } catch (error) {
      console.log("Erreur lors de la récupération de la catégorie :", error);
      return res.status(500).json("Impossible de récupérer la catégorie.");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const data = req.params;
      const newCategory = new Category(data.id, data.name);
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

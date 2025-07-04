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
      // // renvoie une réponse en json, status ok
      return res.status(200).json(result);
      // // si erreur
    } catch (error) {
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
      return res.status(200).json(result);
      // si erreur
    } catch (error) {
      // alors on renvoie un status 500 avec un message d'erreur
      return res.status(500).json("Impossible de récupérer les catégories.");
    }
  },

  getCategoryById: async (req, res) => {
    try {
      // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
      const id = parseInt(req.params.id);
      // vérifie que l'id est un nombre valide via la fonction isNan
      if (isNaN(id)) {
        // si oui, alors renvoie un status 400 (bad request) avec un message d'erreur
        return res.status(400).json("Id non valide.");
      }
      // on recherche la categorie via son id
      const result = await Category.findById(id);
      // si différent de result, donc de l'id
      if (!result) {
        // on renvoie un status 404 (not found) avec un message d'erreur
        return res.status(404).json("Catégorié introuvable.");
      }
      // sinon on renvoie la nouvelle catégorie
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Impossible de récupérer la catégorie.");
    }
  },

  updateCategory: async (req, res) => {
    try {
      // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
      const id = parseInt(req.params.id);
      const name = req.body.name;
      // si id n'est pas un numbre ou que name est vide
      if (!id || !name) {
        //renvoie une erreur
        return res.status(400).json("L'id et le nom sont obligatoires.");
      }
      const newCategory = new Category({ id, name });
      const result = await newCategory.update();
      // si pas de catégorie mis à jour
      if (!result) {
        // on renvoie une erreur
        return res.status(404).json("Catégorie non trouvée.");
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(304).json("Impossible de mettre à jour la catégorie.");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      // on récupère l'id présente dans l'url qu'on va convertir en entier avec la fonction parseInt
      const id = parseInt(req.params.id);
      // vérifie que l'id est un nombre valide via la fonction isNan, si c'est pas le cas
      if (isNaN(id)) {
        // renvoie une erreur
        return res.status(400).json("l'id n'est pas valide.");
      }
      const newCategory = new Category({ id });
      const result = await newCategory.delete();
      // si result = 0, c'est qu'aucune categorie n'a été supprimée
      if (result === 0) {
        return res.status(404).json("La catégorie est introuvable.")
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Impossible de supprimer la catégorie.");
    }
  },
};

export default categoryController;

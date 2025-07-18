// Import de nos dépendances
// Import de notre Framework express
import express from "express";
// Import de notre dépendance qui nous permettra de faire appel à nos variables d'états
import * as dotenv from "dotenv";
// Import de notre routeur
import router from "./src/app/router.js";
// Import du module cors pour permettre les echanges entre front et back
import cors from "cors";

// Appel de notre fichier .env pour nos variables d'états
dotenv.config();

/**
 * Appel de la fonction "Top-Level" de notre framework
 * @link https://expressjs.com/en/5x/api.html#express
 */ 
// Création de notre application express
const app = express();

// Paramétrage de notre moteur de vue
app.set('view engine', 'ejs');
// Cheminement de nos vue renvoyé

app.set('views', './src/app/views')

// Initialisation des options des cors
const optionsCORS = {
    origin: "http://localhost:1234"
}

// Middleware permettant la gestion des CORS
app.use(cors(optionsCORS))

// Middleware nous permettant de récupérer le contenu JSON de la requête via req.body
app.use(express.json());

// Appel du router de notre application
app.use(router);

// Permet de servir statiquement les fichiers depuis le dossier "uploads"
app.use("/uploads", express.static("uploads"));

// Appel de notre port d'écoute
const port = process.env.PORT || 3000

// Mise en écoute de notre serveur sur notre port défini
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
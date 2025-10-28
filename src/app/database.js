import pg from "pg";
// import * as dotenv from "dotenv";
import dotenv from "dotenv";

// Lecture de nos variables d'environnement
dotenv.config();

// Création de notre objet client
const client = new pg.Client();

// Connexion à notre DB
client.connect();

// Export pour pouvoir utiliser les méthodes associées
export default client;
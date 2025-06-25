// création du client de connexion à postgreSQL
import pg from 'pg';
import dotenv from 'dotenv';

// on charge le .env
dotenv.config();

// on crée un client depuis l'objet pg et sa classe Client
const db = new pg.Client();

// on se connecte à postegreSQL
db.connect();

export default db;
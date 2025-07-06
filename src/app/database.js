import pg from "pg";
// import * as dotenv from "dotenv";
import dotenv from "dotenv";

dotenv.config();


// Fichier .env n'est pas lu.. à corriger avant de push !
const client = new pg.Client({
    PGUSER:,
    PGHOST: localhost,
    PGPASSWORD:,
    PGDATABASE:,
    PGPORT:
});

client.connect();

export default client;
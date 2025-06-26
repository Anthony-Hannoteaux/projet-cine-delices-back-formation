import pg from "pg";
// import * as dotenv from "dotenv";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.PGHOST)
console.log(process.env.PGPORT)
console.log(process.env.PGDATABASE)
console.log(process.env.PGUSER)
console.log(process.env.PGPASSWORD)


// Fichier .env n'est pas lu.. à corriger avant de push !
const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'cinedelices',
    user: 'cinedelices',
    password: 'cinedelices'
});

client.connect();

export default client;
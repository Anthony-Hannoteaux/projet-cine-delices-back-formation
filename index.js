// Import de nos dépendances
// Import de notre Framework express
import express from "express";
// Import de notre dépendance qui nous permettra de faire appel à nos variables d'états
import * as dotenv from "dotenv";

// Appel de notre fichier .env pour nos variables d'états
dotenv.config();

/**
 * Appel de la fonction "Top-Level" de notre framework
 * @link https://expressjs.com/en/5x/api.html#express
 */ 
const app = express();


// Paramétrage de notre moteur de vue
app.set('view engine', 'ejs');
// Cheminement de nos vue renvoyé
app.set('views', './src/views')

// Appel de notre port d'écoute
const port = process.env.PORT || 3000

// Premier test de rendu
app.get('/', (req, res) => {
    res.send("<h1>Test</h1>")
})

// Mise en écoute de notre serveur sur notre port défini
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
-- Création du fichier de migration

-- Mise en place de la transaction, analyse de nos instructions avant exécution
-- BEGIN => Indique le début de notre script
BEGIN;

-- Instruction permettant la rejouabilité
-- Si les tables existes alors elles seront supprimé
-- Le mot clé CASCADE permet de supprimer aussi les objets dépendants à ces tables
DROP TABLE IF EXISTS "genre", "movie", "movie_has_genre", "recipe", "category", "user", "step", "recipe_has_category" CASCADE;

-- Instruction pour créer la table (ici "user")
CREATE TABLE "user" (
    -- Permet de générer un id de façon automatique en tant que clé primaire de l'enregistrement
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- VARCHAR pour limiter le nombre maximum de caractère pour la valeur de cette colonne
    -- UNIQUE pour indiquer qu'elle doit être unique
    -- NOT NULL pour la contraindre à être obligatoire
    "username" VARCHAR(32) UNIQUE NOT NULL,
    "email" VARCHAR(32) UNIQUE NOT NULL,
    -- Utilisation d'un type TEXT pour ne pas limiter le nombre de caractère enregistré pour cette colonne
    "password" TEXT NOT NULL,
    -- "created_at" est une colonne de type TIMESTAMP qui enregistre la date et l'heure de création de l'utilisateur
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- Indique si l'utilisateur est actif ou non
    "is_active" BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE "genre" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- auto-généré
    "name" VARCHAR(64) NOT NULL
);

CREATE TABLE "movie" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- auto-généré
    "title" VARCHAR(255) NOT NULL,
    "overview" TEXT,
    "poster_path" TEXT,
    "media_type" VARCHAR(10) NOT NULL,
    "TMDB_id" INTEGER UNIQUE NOT NULL -- TMDB ID
);

CREATE TABLE "movie_has_genre" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "movie_id" INTEGER REFERENCES "movie"("id") ON DELETE CASCADE,
    "genre_id" INTEGER REFERENCES "genre"("id")
);

CREATE TABLE "category" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(24) UNIQUE NOT NULL
);

CREATE TABLE "recipe" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255) UNIQUE NOT NULL,
    "difficulty" VARCHAR(32) NOT NULL,
    "budget" VARCHAR(32) NOT NULL,
    "servings" INTEGER NOT NULL,
    "preparation_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "story" TEXT UNIQUE,
    "picture" TEXT UNIQUE,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "movie_id" INTEGER REFERENCES "movie"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "recipe_has_category" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "recipe_id" INTEGER REFERENCES "recipe"("id") ON DELETE CASCADE, -- Supprimer les associations si la recette est supprimée
    "category_id" INTEGER REFERENCES "category"("id")
);

CREATE TABLE "step" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "recipe_id" INTEGER REFERENCES "recipe"("id") ON DELETE CASCADE
);

COMMIT;
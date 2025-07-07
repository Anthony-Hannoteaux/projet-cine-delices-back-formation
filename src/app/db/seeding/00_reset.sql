-- Separation de la logique de réinitialisation de la base de données avec la logique de seeding pour éviter les conflits et faciliter la maintenance.

BEGIN;
TRUNCATE TABLE "step", "recipe_has_category", "recipe", "category", "user", "movie", "genre", "movie_has_genre" RESTART IDENTITY CASCADE;
COMMIT;
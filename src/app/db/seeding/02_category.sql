-- Test de seeding

BEGIN;

TRUNCATE TABLE "category" RESTART IDENTITY CASCADE;

INSERT INTO "category" ("name") VALUES 
    ('Entrée'),
    ('Plat'),
    ('Dessert'),
    ('Boisson'),
    ('Apéritif'),
    ('Petit déjeuner'),
    ('Snack'),
    ('Végétarien'),
    ('Vegan'),
    ('Sans gluten');

COMMIT;
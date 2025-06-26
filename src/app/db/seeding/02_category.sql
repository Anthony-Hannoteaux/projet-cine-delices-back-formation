-- Test de seeding

BEGIN;

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
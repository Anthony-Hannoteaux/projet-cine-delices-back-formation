-- Test de seeding

BEGIN;

INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
    (1, 1), -- Salade César -> Entrée
    (1, 8), -- Salade César -> Végétarien
    (2, 2), -- Boeuf Bourguignon -> Plat
    (2, 8), -- Boeuf Bourguignon -> Végétarien
    (3, 3), -- Tarte Tatin -> Dessert
    (3, 7); -- Tarte Tatin -> Snack

COMMIT;
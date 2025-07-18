-- Test de seeding

BEGIN;

-- Salade César
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (1, 1), -- Entrée
  (1, 8); -- Végétarien

-- Boeuf Bourguignon
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (2, 2); -- Plat

-- Tarte Tatin
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (3, 3), -- Dessert
  (3, 7); -- Snack

-- Poulet au curry
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (4, 2); -- Plat

-- Lasagnes maison
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (5, 2); -- Plat

-- Soupe à l’oignon
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (6, 1), -- Entrée
  (6, 8); -- Végétarien

-- Quiche Lorraine
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (7, 2); -- Plat

-- Risotto aux champignons
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (8, 2), -- Plat
  (8, 8); -- Végétarien

-- Tiramisu
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (9, 3); -- Dessert

-- Couscous royal
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (10, 2); -- Plat

-- Burger maison
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (11, 2), -- Plat
  (11, 7); -- Snack

-- Gratin dauphinois
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (12, 2), -- Plat
  (12, 8); -- Végétarien

-- Paëlla
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (13, 2); -- Plat

-- Ratatouille
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (14, 2), -- Plat
  (14, 8); -- Végétarien

-- Crêpes sucrées
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (15, 5), -- Petit déjeuner
  (15, 3); -- Dessert

-- Poulet rôti
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (16, 2); -- Plat

-- Gâteau au chocolat
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (17, 3); -- Dessert

-- Poulet chorizo
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (18, 2); -- Plat

-- Salade de chèvre chaud
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (19, 1), -- Entrée
  (19, 8); -- Végétarien

-- Clafoutis aux cerises
INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
  (20, 3); -- Dessert

COMMIT;

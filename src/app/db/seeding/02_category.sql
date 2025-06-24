-- Test de seeding

BEGIN;

TRUNCATE TABLE "recipe", "category", "user", "step", "recipe_has_category" RESTART IDENTITY;

    INSERT INTO "user" ("username", "email", "password") VALUES
        ('chef1', 'chef1@yahoo.fr', 'password1'),
        ('chef2', 'chef2@hotmail.fr', 'password2'),
        ('chef3', 'chef3@hotmail.fr', 'password3'),
        ('chef4', 'chef4@hotmail.fr', 'password4'),
        ('chef5', 'chef5@hotmail.fr', 'password5');

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

    INSERT INTO "recipe" ("title", "description", "difficulty", "budget", "servings", "preparation_time", "cook_time", "story", "picture", "user_id") VALUES
        ('Salade César', 'Une salade classique avec du poulet grillé, des croûtons et une vinaigrette crémeuse.', 'Facile', 'Économique', 4, 15, 10, 'Idéale pour un déjeuner léger.', 'https://example.com/salade-cesar.jpg', 1),
        ('Boeuf Bourguignon', 'Un ragoût de boeuf mijoté dans du vin rouge avec des légumes.', 'Difficile', 'Moyen', 6, 30, 120, 'Un plat traditionnel français réconfortant.', 'https://example.com/boeuf-bourguignon.jpg', 2),
        ('Tarte Tatin', 'Une tarte aux pommes renversée caramélisée.', 'Moyen', 'Économique', 8, 20, 40, 'Un dessert classique qui plait à tous.', 'https://example.com/tarte-tatin.jpg', 3);

    INSERT INTO "recipe_has_category" ("recipe_id", "category_id") VALUES
        (1, 1), -- Salade César -> Entrée
        (1, 8), -- Salade César -> Végétarien
        (2, 2), -- Boeuf Bourguignon -> Plat
        (3, 3); -- Tarte Tatin -> Dessert

    INSERT INTO "step" ("number", "description", "recipe_id") VALUES
        -- Étapes pour la Salade César
        (1, 'Laver et couper la laitue.', 1),
        (2, 'Griller le poulet et le couper en morceaux.', 1),
        (3, 'Préparer la vinaigrette en mélangeant la mayonnaise, le jus de citron et l''ail.', 1),
        (4, 'Mélanger tous les ingrédients dans un grand bol.', 1),
        (5, 'Servir avec des croûtons.', 1),
        -- Étapes pour le Boeuf Bourguignon
        (1, 'Couper la viande en morceaux et la faire revenir dans une cocotte.', 2),
        (2, 'Ajouter les légumes coupés et faire revenir.', 2),
        (3, 'Verser le vin rouge et laisser mijoter.', 2),
        (4, 'Assaisonner avec des herbes et des épices.', 2),
        (5, 'Laisser mijoter pendant au moins 2 heures.', 2),
        -- Étapes pour la Tarte Tatin
        (1, 'Préparer la pâte et la laisser reposer.', 3),
        (2, 'Couper les pommes et les caraméliser dans du beurre et du sucre.', 3),
        (3, 'Étaler la pâte sur les pommes et cuire au four.', 3),
        (4, 'Laisser refroidir avant de démouler.', 3),
        (5, 'Servir tiède avec de la crème fraîche.', 3);
COMMIT;
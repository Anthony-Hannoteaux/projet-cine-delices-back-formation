-- Test de seeding

BEGIN;

TRUNCATE TABLE "step" RESTART IDENTITY;

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
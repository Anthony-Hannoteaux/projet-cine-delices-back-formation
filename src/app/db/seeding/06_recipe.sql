--Test de seeding

BEGIN;

INSERT INTO "recipe"("title", "description", "difficulty", "budget", "servings", "preparation_time", "cook_time", "story", "picture", "user_id", "movie_id") VALUES
    ('Salade César', 'Une salade classique avec du poulet grillé, des croûtons et une vinaigrette crémeuse.', 'Facile', 'Économique', 4, 15, 10, 'Idéale pour un déjeuner léger.', 'https://example.com/salade-cesar.jpg', 1, 1),
    ('Boeuf Bourguignon', 'Un ragoût de boeuf mijoté dans du vin rouge avec des légumes.', 'Difficile', 'Raisonnable', 6, 30, 120, 'Un plat traditionnel français réconfortant.', 'https://example.com/boeuf-bourguignon.jpg', 2, 2),
    ('Tarte Tatin', 'Une tarte aux pommes renversée caramélisée.', 'Moyen', 'Économique', 8, 20, 40, 'Un dessert classique qui plait à tous.', 'https://example.com/tarte-tatin.jpg', 3, 3);

COMMIT;
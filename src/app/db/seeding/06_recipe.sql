--Test de seeding

BEGIN;

INSERT INTO "recipe"(
  "title", "description", "difficulty", "budget", "servings",
  "preparation_time", "cook_time", "story", "picture", "user_id", "movie_id"
) VALUES
('Salade César', 'Une salade classique avec du poulet grillé, des croûtons et une vinaigrette crémeuse.', 'Facile', 'Économique', 4, 15, 10, 'Idéale pour un déjeuner léger.', 'https://images.pexels.com/photos/5639360/pexels-photo-5639360.jpeg', 1, 1),
('Boeuf Bourguignon', 'Un ragoût de boeuf mijoté dans du vin rouge avec des légumes.', 'Difficile', 'Raisonnable', 6, 30, 120, 'Un plat traditionnel français réconfortant.', 'https://images.pexels.com/photos/17872668/pexels-photo-17872668.jpeg', 2, 2),
('Tarte Tatin', 'Une tarte aux pommes renversée caramélisée.', 'Moyen', 'Économique', 8, 20, 40, 'Un dessert classique qui plait à tous.', 'https://images.pexels.com/photos/7790871/pexels-photo-7790871.jpeg', 3, 3),
('Poulet au curry', 'Poulet mijoté dans une sauce au curry doux et lait de coco.', 'Facile', 'Économique', 4, 20, 30, 'Inspiré des saveurs indiennes.', 'https://images.pexels.com/photos/23897674/pexels-photo-23897674.jpeg', 1, 4),
('Lasagnes maison', 'Des couches de pâtes, viande hachée et béchamel gratinée.', 'Moyen', 'Raisonnable', 6, 30, 45, 'Un classique italien revisité.', 'https://images.pexels.com/photos/29174061/pexels-photo-29174061.jpeg', 2, 5),
('Soupe à l’oignon', 'Soupe gratinée aux oignons caramélisés et pain grillé.', 'Facile', 'Économique', 4, 15, 40, 'Réconfortante et typiquement française.', 'https://images.pexels.com/photos/1618952/pexels-photo-1618952.jpeg', 3, 6),
('Quiche Lorraine', 'Quiche aux lardons, œufs et crème sur pâte brisée.', 'Facile', 'Économique', 6, 15, 35, 'Originaire de Lorraine.', 'https://images.pexels.com/photos/5852247/pexels-photo-5852247.jpeg', 1, 7),
('Risotto aux champignons', 'Riz crémeux aux champignons et parmesan.', 'Moyen', 'Raisonnable', 4, 10, 25, 'Un plat italien raffiné.', 'https://images.pexels.com/photos/11190138/pexels-photo-11190138.jpeg', 2, 8),
('Tiramisu', 'Dessert italien au café, mascarpone et cacao.', 'Facile', 'Économique', 6, 20, 0, 'Un incontournable des fins de repas.', 'https://images.pexels.com/photos/12035685/pexels-photo-12035685.jpeg', 3, 9),
('Couscous royal', 'Semoule accompagnée de viandes et légumes épicés.', 'Difficile', 'Généreux', 8, 40, 60, 'Un plat convivial et festif.', 'https://images.pexels.com/photos/16743489/pexels-photo-16743489.jpeg', 1, 10),
('Burger maison', 'Pain moelleux, steak, fromage et garnitures.', 'Facile', 'Raisonnable', 2, 15, 10, 'Un classique américain revisité.', 'https://images.pexels.com/photos/7449115/pexels-photo-7449115.jpeg', 2, 11),
('Gratin dauphinois', 'Pommes de terre à la crème et au fromage gratiné.', 'Facile', 'Économique', 6, 20, 60, 'Originaire du Dauphiné.', 'https://images.pexels.com/photos/28859389/pexels-photo-28859389.jpeg', 3, 12),
('Paëlla', 'Riz safrané aux fruits de mer et poulet.', 'Difficile', 'Généreux', 6, 30, 45, 'Un plat espagnol festif.', 'https://images.pexels.com/photos/13647484/pexels-photo-13647484.jpeg', 1, 13),
('Ratatouille', 'Mélange de légumes méditerranéens mijotés.', 'Facile', 'Économique', 4, 15, 40, 'Un hommage au film éponyme.', 'https://images.pexels.com/photos/7439978/pexels-photo-7439978.jpeg', 2, 14),
('Crêpes sucrées', 'Pâte fine garnie de sucre, confiture ou chocolat.', 'Facile', 'Économique', 10, 10, 20, 'Parfaites pour le goûter.', 'https://images.pexels.com/photos/26898062/pexels-photo-26898062.jpeg', 3, 15),
('Poulet rôti', 'Poulet entier rôti aux herbes et pommes de terre.', 'Facile', 'Raisonnable', 4, 15, 60, 'Un classique du dimanche.', 'https://images.pexels.com/photos/9967258/pexels-photo-9967258.jpeg', 1, 16),
('Gâteau au chocolat', 'Moelleux au chocolat noir fondant.', 'Facile', 'Économique', 8, 15, 25, 'Pour les amateurs de cacao.', 'https://images.pexels.com/photos/2957897/pexels-photo-2957897.jpeg', 2, 17),
('Poulet chorizo', 'Émincé de poulet sauté au chorizo et poivrons.', 'Moyen', 'Raisonnable', 4, 20, 30, 'Un plat relevé et coloré.', 'https://images.pexels.com/photos/20408459/pexels-photo-20408459.jpeg', 3, 18),
('Salade de chèvre chaud', 'Toasts de chèvre sur lit de salade et noix.', 'Facile', 'Économique', 2, 10, 5, 'Un classique des brasseries.', 'https://images.pexels.com/photos/25524086/pexels-photo-25524086.jpeg', 1, 19),
('Clafoutis aux cerises', 'Gâteau moelleux aux cerises entières.', 'Facile', 'Économique', 6, 15, 35, 'Un dessert de saison.', 'https://images.pexels.com/photos/20228708/pexels-photo-20228708.jpeg', 2, 20);

COMMIT;




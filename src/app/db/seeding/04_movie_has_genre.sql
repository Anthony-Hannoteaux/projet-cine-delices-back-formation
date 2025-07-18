BEGIN;

-- The Old Guard 2
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (1, 1), -- Action
  (1, 2); -- Thriller

-- Ballerina
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (2, 1), -- Action
  (2, 5); -- Romance

-- Heads of State
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (3, 4), -- Comédie
  (3, 2); -- Thriller

-- Ice Road: Vengeance
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (4, 1), -- Action
  (4, 2); -- Thriller

-- Thunderbolts*
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (5, 1), -- Action
  (5, 9); -- Fantastique

-- Jurassic World Rebirth
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (6, 9), -- Fantastique
  (6, 6); -- Science-fiction

-- Karate Kid: Legends
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (7, 1), -- Action
  (7, 3); -- Drame

-- Final Destination Bloodlines
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (8, 2), -- Thriller
  (8, 7); -- Horreur

-- Bring Her Back
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (9, 7), -- Horreur
  (9, 3); -- Drame

-- Superman
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (10, 1), -- Action
  (10, 6); -- Science-fiction

-- Dora and the Search for Sol Dorado
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (11, 8), -- Animation
  (11, 9); -- Fantastique

-- Lilo & Stitch
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (12, 4), -- Comédie
  (12, 6); -- Science-fiction

-- KPop Demon Hunters
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (13, 8), -- Animation
  (13, 7); -- Horreur

-- Muromachi Burai
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (14, 1), -- Action
  (14, 3); -- Drame

-- The Ritual
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (15, 7), -- Horreur
  (15, 3); -- Drame

-- How to Train Your Dragon
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (16, 8), -- Animation
  (16, 9); -- Fantastique

-- F1
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (17, 1), -- Action
  (17, 3); -- Drame

-- Sinners
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (18, 7), -- Horreur
  (18, 3); -- Drame

-- xXx
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (19, 1), -- Action
  (19, 2); -- Thriller

-- Long Distance
INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
  (20, 6), -- Science-fiction
  (20, 2); -- Thriller

COMMIT;

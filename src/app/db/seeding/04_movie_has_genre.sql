BEGIN;

INSERT INTO "movie_has_genre" ("movie_id", "genre_id") VALUES
    (1, 2), -- Final Destination Bloodlines -> thriller
    (1, 7), -- Final Destination Bloodlines -> horreur
    (2, 4), -- Lilo & Stitch -> comédie
    (2, 6), -- Lilo & Stitch -> science fiction
    (3, 10), -- The Twisters -> documentaire
    (4, 1); -- How to Train Your Dragon -> action

COMMIT;
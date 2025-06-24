-- Test de seeding

BEGIN;

TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;

INSERT INTO "user" ("username", "email", "password") VALUES
    ('chef1', 'chef1@yahoo.fr', 'password1'),
    ('chef2', 'chef2@hotmail.fr', 'password2'),
    ('chef3', 'chef3@hotmail.fr', 'password3'),
    ('chef4', 'chef4@hotmail.fr', 'password4'),
    ('chef5', 'chef5@hotmail.fr', 'password5');

COMMIT;
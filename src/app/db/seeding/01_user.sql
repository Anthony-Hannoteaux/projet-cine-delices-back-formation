-- Test de seeding

BEGIN;

INSERT INTO "user" ("username", "email", "password", "created_at","is_active") VALUES
    ('chef1', 'chef1@yahoo.fr', 'password1', CURRENT_TIMESTAMP, 'TRUE'),
    ('chef2', 'chef2@hotmail.fr', 'password2', CURRENT_TIMESTAMP, 'TRUE'),
    ('chef3', 'chef3@hotmail.fr', 'password3', CURRENT_TIMESTAMP, 'TRUE'),
    ('chef4', 'chef4@hotmail.fr', 'password4', CURRENT_TIMESTAMP, 'TRUE'),
    ('chef5', 'chef5@hotmail.fr', 'password5', CURRENT_TIMESTAMP, 'TRUE'),

COMMIT;
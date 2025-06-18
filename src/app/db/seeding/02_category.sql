-- Test de seeding

BEGIN;
    
    INSERT INTO "category" ("name") VALUES
        ('Entrée'),
        ('Plat');

COMMIT;
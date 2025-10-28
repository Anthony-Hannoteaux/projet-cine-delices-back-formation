// Import des modules de vitest permettant de créer notre test
import { describe, it, expect, vi } from "vitest";
// Import de notre modèle User
import User from "../src/app/models/User";
// Import de notre client pg
import client from "../src/app/database.js";

/**
 * Nous permet de simuler l'appel de notre module
 * @link https://vitest.dev/api/vi.html#vi-mock
 * Ce qui permet de pouvoir tester le résultat de notre requête SQL
 * Sans modifier notre véritable base de données
 */
vi.mock("../src/app/database.js", () => ({
    // default : Doit être indiqué lorsque l'on simule un module exporté par défaut
    // query : représente notre fonction simulé
    default: { query: vi.fn() },
}));

// Annotation permettant de décrire le test englobé
describe("Test notre méthode de création de notre modèle User", () => {
    it("Devrait enregistrer un nouvel utilisateur en BD", async () => {
        // Valeur simulé attendu en cas de réussite
        client.query.mockResolvedValueOnce({ rowCount: 1 });
        // On instancie un nouvel utilisateur
        const user = new User({
            username: "Toto",
            email: "totomail.co",
            password: "superMdpSecure@1234",
        });
        // On souhaite tester la méthode create de notre modèle
        const result = await user.create();
        // On vérifie que c'est bien la bonne requête envoyé
        expect(client.query).toHaveBeenCalledWith(
            expect.stringContaining("INSERT INTO"),
            [user.username, user.email, user.password]
        );
        // On vérifie qu'on récupère "1", étant la valeur
        expect(result).toBe(1);
    });
});

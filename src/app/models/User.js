import validator from "validator";

class User {
    // Initialisation des propriétés privées
    #username;
    #email;
    #password;

    constructor(config) {
        this.username = config.username;
        this.email = config.email;
        this.password = config.password;
    }

    // Initialisation des getters (accesseurs) des propriétés privées
    get username() {
        return this.#username;
    }
    
    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // Initialisation des setters (mutateurs) des propriétés privées
    set username(value) {
        // Le nom d'utilisateur doit être une chaîne de caractère non vide
        if (typeof value !== "string" && value.lenght > 0) {
            throw new Error("Le nom d'utilisateur doit être une chaîne de caractère non vide.")
        }
        this.#username = value;
    }
    
    set email(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Veuillez renseigner un email valide.");
        }
        this.#email = value;
    }

    set password(value) {
        if(!value) {
            throw new Error("Mot de passe invalide.")
        }
        this.#password = value;
    }
}

// Premier test d'initialisation d'instance d'un objet User
const newUser = {
    username: "John Doe",
    email: "johndoe@mail.com",
    password: "superpassword"
}

const userTest = new User(newUser);

console.log(userTest.username, userTest.email, userTest.password)
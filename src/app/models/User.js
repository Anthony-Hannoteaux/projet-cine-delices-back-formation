import validator from "validator";
// initialisation de la classe User
class User {
    // initialisation des propriétés privées
    #username;
    #email;
    #password;

    constructor(config) {
        this.username = config.username;
        this.email = config.username;
        this.password = config.password;
    }
    // mise en place des getteurs
    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // mise en place des setteurs (mutateurs)
    set username(value) {
        if (value.length > 32 || value.length < 1) {
            throw new Error("Votre nom d'utilisateur doit contenir entre 1 et 32 caractères");
        }
        this.#username = value;
    }

    set email(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Le format d'email n'est pas valide");
        }
        this.#email = value;
    }

    set password(value) {
        this.#password = value;
    }
}

const user1 = {
    username: "John Doe",
    email: "johndoeemail.com",
    password: "password"
}
const userTest = new User(user1);

// console.log(user1.email);

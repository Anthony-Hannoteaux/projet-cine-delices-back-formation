import Category from "./src/app/models/Category.js";
import client from "./src/app/database.js";

// TEST //

// ok
const categoryTest = new Category(15, "lea");

// -> renvoie youssef / 1
console.log(categoryTest.id, categoryTest.name);

// -> Category {}
console.log(categoryTest);

// ok -> renvoie jul
categoryTest.name = "jul";
console.log(categoryTest.name);

// CREATE
categoryTest.create();
console.log(categoryTest.name);

// READ
Category.findAll();
console.log(categoryTest);

// UPDATE
const test = await Category.findById(10);
console.log(test);

// DELETE
categoryTest.id = "qSarah";
categoryTest.update();
// console.log(categoryTest.name);

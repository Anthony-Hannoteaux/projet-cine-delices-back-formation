import Category from "./src/app/models/Category.js";

const categoryTest = new Category("you");
console.log(categoryTest.name);

categoryTest.name = "youssef";
console.log(categoryTest.name);

Category.findAll();

Category.findById(1);

// TEST //

// CREATE 

// READ 

// UPDATE 

// DELETE 


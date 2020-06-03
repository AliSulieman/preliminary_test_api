const Sequelize = require('sequelize').Sequelize;
//Create instance of our database
const sequelize = new Sequelize("preliminary", "postgres", "krombo", {
    dialect: "postgres",
});

//Import all of our models to setup
const models = {
    user: sequelize.import("./user"),
    project: sequelize.import("./projects"),
    task: sequelize.import("./Task"),
    // Team: sequelize.import('./team'),
};

//Loop through each model and check if it has an associate
//function, if yes then call it
Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

//Assign sequalize to the database instance
models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;
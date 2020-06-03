import models from "./models";
import express from 'express';
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json())
// importRoutes for the "GET" METHODS
const getRoutes = require('./routes/get')
app.use('/', getRoutes)

const postRoutes = require('./routes/post')
app.use('/', postRoutes)

models.sequelize.sync().then(() => {
  app.listen(8081);
});
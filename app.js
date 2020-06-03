import models from "./models";
import express from 'express';

const app = express();

models.sequelize.sync().then(() => {
  app.listen(8081);
});
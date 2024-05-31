const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const db = require("../models");
const routes = require("./routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// connect to DB with sequelize

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

module.exports = { app };
 
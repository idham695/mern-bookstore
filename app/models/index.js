import dbConfig from "../config/db.js";
import Sequelize from "sequelize";
import db from "../config/db.js";
import books from "./books.js";
import categories from "./categories.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },

  // disable logging; default: console.log
  logging: false,
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = books(sequelize, Sequelize);
db.categories = categories(sequelize, Sequelize);

export default db;

import dbConfig from "../config/db.js";
import Sequelize from "sequelize";
import db from "../config/db.js";
import books from "./books.js";

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

export default db;

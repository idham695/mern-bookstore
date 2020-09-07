import dbConfig from "../config/db.js";
import Sequelize from "sequelize";
import db from "../config/db.js";
import books from "./books.js";
import categories from "./categories.js";
import orders from "./orders.js";
import users from "./users.js";
import book_order from "./book_order.js";

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
db.users = users(sequelize, Sequelize);
db.book_order = book_order(sequelize, Sequelize);
db.orders = orders(sequelize, Sequelize);

db.categories.hasMany(db.books, { as: "books" });
db.books.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "categories",
});

export default db;

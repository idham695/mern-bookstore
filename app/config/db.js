export default {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Guard1234",
  DB: "bookstore",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./app/models";
import books from "./app/routes/books.js";
import categories from "./app/routes/categories.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

db.sequelize.sync();

books(app);
categories(app);

// simple routes
app.get("/", (req, res) => {
  res.json({ message: "Bookstore" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

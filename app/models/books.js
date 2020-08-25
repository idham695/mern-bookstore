export default (sequelize, Sequelize) => {
  const Books = sequelize.define("books", {
    title: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    publisher: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    views: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      defaultValue: "published",
    },
  });

  return Books;
};

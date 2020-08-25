export default (sequelize, Sequelize) => {
  const Categories = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("draft", "published"),
      defaultValue: "published",
    },
  });

  return Categories;
};

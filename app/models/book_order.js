export default (sequelize, Sequelize) => {
  const Book_Order = sequelize.define("book_order", {
    book_id: {
      type: Sequelize.INTEGER,
    },
    order_id: {
      type: Sequelize.INTEGER,
    },
    quantity_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Book_Order;
};

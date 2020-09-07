export default (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    total_price: {
      type: Sequelize.FLOAT,
    },
    invoice_number: {
      type: Sequelize.STRING,
    },
    courier_service: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("SUBMIT", "PROCESS", "FINISH", "CANCEL"),
      defaultValue: "SUBMIT",
    },
  });

  return Order;
};

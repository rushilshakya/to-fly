const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("cart", "checked_out"),
      allowNull: false,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "order",
  }
);

module.exports = Order;

const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "order_detail",
  }
);

module.exports = OrderDetail;

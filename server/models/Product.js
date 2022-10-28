const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "product",
  }
);

module.exports = Product;

const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const OrderDetail = require("./OrderDetail");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderDetail });
Product.belongsToMany(Order, { through: OrderDetail });

module.exports = {
  User,
  Product,
  Order,
  OrderDetail,
};

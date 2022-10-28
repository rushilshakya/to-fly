const cartRouter = require("express").Router();
const { Order, Product, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

cartRouter.post("/", tokenExtractor, async (request, response) => {
  const { product_id, quantity } = request.body;

  try {
    const product = await Product.findByPk(product_id);
    const user = await User.findByPk(request.decodedToken.id);

    const [order] = await Order.findOrCreate({
      where: {
        status: "cart",
        user_id: user.id,
      },
    });

    await order.setUser(user);

    await order.addProduct(product, {
      through: { item_price: product.price, quantity },
    });

    response.status(201).json(order);
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

cartRouter.get("/", tokenExtractor, async (request, response) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: "cart",
        user_id: request.decodedToken.id,
      },
      include: [Product],
    });

    response.json(cart);
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

module.exports = cartRouter;

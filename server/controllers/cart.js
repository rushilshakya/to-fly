const cartRouter = require("express").Router();
const { Order, Product, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

cartRouter.post("/", tokenExtractor, async (request, response) => {
  const { product_id, quantity } = request.body;

  try {
    const product = await Product.findByPk(product_id);

    const [order, created] = await Order.findOrCreate({
      where: {
        status: "cart",
        user_id: request.decodedToken.id,
      },
    });

    if (created) {
      const user = await User.findByPk(request.decodedToken.id);
      await order.setUser(user);
    }

    await order.addProduct(product, {
      through: { item_price: product.price, quantity },
    });

    response
      .status(201)
      .json({ id: product.id, item_price: product.price, quantity });
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

cartRouter.get("/", tokenExtractor, async (request, response) => {
  try {
    const order = await Order.findOne({
      where: {
        status: "cart",
        user_id: request.decodedToken.id,
      },
      include: [Product],
    });

    let cart;

    if (order === null) {
      cart = {};
    } else {
      cart = {
        address: order.address,
        order_detail: order.products.map((x) => ({
          id: x.id,
          item_price: x.order_detail.item_price,
          quantity: x.order_detail.quantity,
        })),
      };
    }

    response.json(cart);
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

module.exports = cartRouter;

const cartRouter = require("express").Router();
const { Order, Product, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

cartRouter.post("/", tokenExtractor, async (request, response) => {
  const { id, quantity } = request.body;

  try {
    const product = await Product.findByPk(id);

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
      cart = { address: null, order_detail: [] };
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

cartRouter.post("/checkout", tokenExtractor, async (request, response) => {
  const { address } = request.body;

  try {
    await Order.update(
      { address, status: "checked_out", check_out_date: Date.now() },
      { where: { status: "cart", user_id: request.decodedToken.id } }
    );

    const cart = { address: null, order_detail: [] };

    response.json(cart);
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

module.exports = cartRouter;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { User, Product, Order } = require("../models");
const { SECRET } = require("../util/config");
const { tokenExtractor } = require("../util/middleware");

usersRouter.post("/", async (request, response) => {
  const { email, password, firstName, lastName, cart } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "password must be provided and length must be at least 3",
    });
  }

  if (!firstName) {
    return response.status(400).json({
      error: "First name must be provided",
    });
  }

  if (!lastName) {
    return response.status(400).json({
      error: "Last name must be provided",
    });
  }

  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    return response.status(400).json({
      error: "email must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = {
    email,
    password: passwordHash,
    first_name: firstName,
    last_name: lastName,
  };

  try {
    const createdUser = await User.create(user);
    //if cart has data, then create it
    if (cart && cart.order_detail) {
      const [order] = await Order.findOrCreate({
        where: {
          status: "cart",
          user_id: createdUser.id,
        },
      });
      await order.setUser(createdUser);

      for (let i = 0; i < cart.order_detail.length; i++) {
        const currProduct = await Product.findByPk(cart.order_detail[i].id);
        await order.addProduct(currProduct, {
          through: {
            item_price: currProduct.price,
            quantity: cart.order_detail[i].quantity,
          },
        });
      }
    }

    //create a logged user response to send, same as login
    const userForToken = {
      email: createdUser.email,
      id: createdUser.id,
      firstName: createdUser.first_name,
      lastName: createdUser.last_name,
    };

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(userForToken, SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(201).send({ token, ...userForToken });
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

usersRouter.get("/", tokenExtractor, async (request, response) => {
  try {
    const user = await User.findByPk(request.decodedToken.id);
    response.status(200).send({
      token: request.token,
      email: user.email,
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
    });
  } catch (e) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
});
module.exports = usersRouter;

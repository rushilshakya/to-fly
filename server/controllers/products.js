const productsRouter = require("express").Router();
const { Product } = require("../models");

productsRouter.post("/", async (request, response) => {
  const { name, image_url, price, stock } = request.body;

  const product = {
    name,
    image_url: image_url
      ? image_url
      : "https://st.depositphotos.com/1040166/2355/i/600/depositphotos_23556677-stock-photo-girl-in-white-t-shirt.jpg",
    price,
    stock,
  };

  try {
    await Product.create(product);
    response.status(201).json({ message: "successfully created product" });
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

productsRouter.get("/", async (request, response) => {
  try {
    const products = await Product.findAll();
    response.json(products);
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

module.exports = productsRouter;

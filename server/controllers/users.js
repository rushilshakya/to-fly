const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { User } = require("../models");

usersRouter.post("/", async (request, response) => {
  const { email, password, firstName, lastName } = request.body;

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
    await User.create(user);
    response.status(201).json({ message: "successfully created user" });
  } catch (error) {
    // next(error);
    return response.status(400).json({ error });
  }
});

module.exports = usersRouter;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

const { User } = require("../models");
const { SECRET } = require("../util/config");

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    email,
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, ...userForToken });
});

module.exports = loginRouter;

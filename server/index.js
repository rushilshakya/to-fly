const app = require("./app"); // the actual Express application
const { PORT } = require("./util/config");
// const { connectToDatabase } = require("./util/db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

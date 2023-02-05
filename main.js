const express = require("express");
const cors = require("cors");
const app = express();

require("./config/database");

app.use(cors());
app.use(express.json());

const productsRouter = require("./routers/productsRouter");
const usersRouter = require("./routers/usersRouter");
const stripeRouter = require("./routers/stripeRouter")


app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/stripe", stripeRouter);


app.listen(8000, () => {
  console.log("Server is listening");
});

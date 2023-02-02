const express = require("express");
const cors = require("cors");
const app = express();

require("./config/database");

app.use(cors());
app.use(express.json());

const productsRouter = require("./routers/productsRouter");
// const productsRouter = require("./routers/");
const stripeRouter = require("./routers/stripeRouter")


app.use("/api/products", productsRouter);
app.use("/api/stripe", stripeRouter);


app.listen(8000, () => {
  console.log("Server is listening");
});

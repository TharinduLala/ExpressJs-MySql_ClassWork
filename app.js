const express = require("express");
const app = express();
const PORT = 9000;
app.use(express.json());

const customerRoute = require("./routes/customerRoute");
const itemRoute = require("./routes/itemRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/customer", customerRoute);
app.use("/item", itemRoute);
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log("App listening on port : " + PORT);
});

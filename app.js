const express = require("express");
const app = express();
const PORT = 9000;
app.use(express.json());

const customerRoute=require('./routes/customerRoute');

app.use("/customer",customerRoute);

app.listen(PORT, () => {
  console.log("App listening on port : " + PORT);
});

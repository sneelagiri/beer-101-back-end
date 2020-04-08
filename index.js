const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const beerRouter = require("./beer/router");
app.use(express.json());
app.use(beerRouter);

app.listen(port, () => {
  console.log("Started port on: ", port);
});

const express = require("express");
const axios = require("axios").default;

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const API_KEY = "659d5c6b8f3d2447f090119e48202fdb";

app.get("/breweries", async (req, res, next) => {
  const apiResponse = await axios.get(
    `https://sandbox-api.brewerydb.com/v2/breweries/?withLocations=Y&key=${API_KEY}`
  );
  res.json(apiResponse.data);
});

app.listen(port, () => {
  console.log("Started on port: ", port);
});

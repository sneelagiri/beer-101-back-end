import express from "express";
import * as superagent from "superagent";
import cors from "cors";

const app: express.Application = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const API_KEY: string = "659d5c6b8f3d2447f090119e48202fdb";

app.get(
  "/breweries",
  async (request: express.Request, response: express.Response) => {
    const apiResponse = await superagent.get(
      `https://sandbox-api.brewerydb.com/v2/breweries/?withLocations=Y&key=${API_KEY}`
    );
    response.status(200).json(apiResponse.body);
  }
);

app.listen(port, () => {
  console.log("Started on port: ", port);
});

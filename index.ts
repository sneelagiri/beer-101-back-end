import express from "express";
import * as superagent from "superagent";
import cors from "cors";
import * as _ from "lodash";
import NodeCache from "node-cache";

interface cache {
  data: string;
}
const app: express.Application = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const API_KEY: string = "659d5c6b8f3d2447f090119e48202fdb";
const myCache = new NodeCache();

app.get(
  "/breweries",
  async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (myCache.has("breweries")) {
        const cachedData: cache | undefined = myCache.get("breweries");
        if (typeof cachedData === "object") {
          const parsedData: object = JSON.parse(cachedData.data);
          response.status(200).json(parsedData);
        }
      } else {
        const apiResponse = await superagent.get(
          `https://sandbox-api.brewerydb.com/v2/breweries/?withLocations=Y&key=${API_KEY}`
        );
        const stringifed = { data: JSON.stringify(apiResponse.body) };
        response.status(200).json(apiResponse.body);
        myCache.set("breweries", stringifed, 10000);
      }
    } catch (error) {
      next(error);
    }
  }
);

app.listen(port, () => {
  console.log("Started on port: ", port);
});

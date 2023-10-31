import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { weekReport } from "./libs/week-reporter";

const app: Express = express();
const port = 3000;
app.use(cors<Request>());

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.post("/", async (req: Request, res: Response) => {
  const { startDate, endDate, personId, token } = req.body;
  const report = await weekReport(startDate, endDate, personId, token);
  console.log(report);

  res.send(report);
});

app.listen(port, () => {
  console.log(`App listening in port ${port}`);
});

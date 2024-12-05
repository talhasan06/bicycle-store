import express, { Request, Response } from "express";
import cors from "cors";
import { BicycleRoutes } from "./app/modules/bicycle/bicycle.route";

const app = express();

//parser
app.use(express.json());
app.use(cors());

app.use("/api", BicycleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

export default app;

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { BicycleRoutes } from "./app/modules/bicycle/bicycle.route";
import globalErrorHandler from "./app/handleError/globalErrorHandler";

const app = express();

//parser
app.use(express.json());
app.use(cors());

app.use("/api", BicycleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Bicycle Store!");
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

app.use(globalErrorHandler);

export default app;

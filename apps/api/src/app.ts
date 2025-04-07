import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import "reflect-metadata";
import { config } from "./config/config";
import { AuthRoutes } from "./routes/auth-routes";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(config.cors));

// Initialize routes
const authRouter = new AuthRoutes().getRouter();

// Routes
app.use("/api/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;

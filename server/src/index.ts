import express, { Request, Response, urlencoded, json } from "express";
import { config as loadEnv } from "dotenv";
import {
  authRouter,
  ratingRouter,
  storeRouter,
  systemAdminRouter,
  userRouter,
} from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { prisma } from "./lib";

// Load environment variables from .env file
loadEnv();

const app = express();

const PORT = process.env.PORT || 3000;

//Middelwares
app.use(json());

app.use(urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Store Rating Platform.");
});

//Routes
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/store", storeRouter);

app.use("/api/rating", ratingRouter);

app.use("/api/systemadmin", systemAdminRouter);

app.use("/api/*splat", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

app.listen(PORT, () => {
  prisma.$connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = async () => {
  console.log("\nShutting down...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

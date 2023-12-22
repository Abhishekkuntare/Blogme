import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

  config({ path: "./config/config.env" });
  const app = express();

  //Using Middleware
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(cookieParser());
  
  const corsOrigin = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  };
app.use(cors(corsOrigin));

//Importing and using routes
import blog from "./routes/blogRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", blog);
app.use("/api/v1", user);

export default app;

app.get("/", (req, res) => {
  res.send(
    `<h1>Site is working click front on <a href=${process.env.FRONTEND_URL}>here</a></h1>`
  );
});

app.use(ErrorMiddleware);

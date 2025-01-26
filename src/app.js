import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
//routes import
import userRouter from "./routes/user.routes.js";
import garbageRouter from "./routes/garbage.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/garbage", garbageRouter);
app.get("/", (req, res) => {
  res.status(200).send("hello city clean");
});

export { app };

import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

config({
  path: "./config/config.env",
});
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "PRODUCTION",
      httpOnly: true,
      sameSite: "None",
    },
  })
);

import course from "./routes/course.routes.js";
import user from "./routes/user.routes.js";
import payment from "./routes/payment.routes.js";
import other from "./routes/other.routes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;

app.use(ErrorMiddleware);

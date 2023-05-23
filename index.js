
import express from "express";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";
import { connectDB } from "./db/mongoConnection.js";
import * as dotenv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import startPassport from "./passport/passport.js";
import userRouter from "./routes/usersRoute.js";
import sessionRouter from "./routes/sessionsRoute.js";
import date from "./middleware/date.js";

dotenv.config();

const PORT = process.env.PORT || 8088;
const MONGO_URL = process.env.MONGO_URI;
const app = express();
const SECRET_KEY = process.env.SECRET_KEY || "CoderS3cR3tC0D3";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 20,
    }),
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

startPassport();
app.use(passport.start());
app.use(passport.session());

app.use(date);
app.get("/", (req, res) => {
  const userData = {
    email: req.session.user.email,
    role: req.session.user.role,
  };
  res.render("home", userData);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
  connectDB(process.env.MONGO_URI);
});

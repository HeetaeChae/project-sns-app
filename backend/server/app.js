import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
const cookieParser = require("cookie-parser");

const app = express();
const port = 7000;

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB is connected"));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", express.static("./public"));

app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/follow", require("./routes/follow"));
app.use("/api/scrap", require("./routes/scrap"));

app.get("/", (req, res) => {
  res.send("hello, world!");
});

app.listen(port, () => {
  console.log("port on 7000 express server");
});

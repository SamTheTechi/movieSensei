require("dotenv").config();
const express = require("express");

const app = express();

const apiRouter = require("./router/api");
const staticRouter = require("./router/static");

const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
app.use(helmet());
app.use(cors());

app.use("/api/v1/", apiRouter);
app.use("/", staticRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

start();

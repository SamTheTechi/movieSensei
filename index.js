require("dotenv").config();
const express = require("express");

const app = express();

const apiRouter = require("./router/api");
const staticRouter = require("./router/static");

const helmet = require("helmet");
const cors = require("cors");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://image.tmdb.org"],
      frameSrc: ["'self'", "https://www.youtube.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  }),
);
app.use(cors((origin = "*")));

app.use("/api/v1/", apiRouter);
app.use("/", staticRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, `0.0.0.0`, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (e) {
    console.error("oops");
  }
};

start();

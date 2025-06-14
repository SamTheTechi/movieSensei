require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const apiRouter = require("./router/api");
const staticRouter = require("./router/static");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://image.tmdb.org"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com"],
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

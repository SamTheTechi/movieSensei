const path = require("path");

const Home = (_, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "home.html"));
};

const Detail = (_, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "movie.html"));
};

module.exports = {
  Home,
  Detail,
};

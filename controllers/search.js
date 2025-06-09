const { BaseURL } = require("../util/baseurl");

const Shows = async (req, res) => {
  try {
    const movieName = req.body.search || "";
    const movieSort = req.body.select || "";

    if (!movieName) {
      const popular = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          },
        },
      );
      const response = await popular.json();
      return res.status(200).json({ data: response });
    } else {
      const query = encodeURIComponent(movieName);
      const info = await fetch(
        `${BaseURL}/${movieSort}?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          },
        },
      );
      const response = await info.json();
      return res.status(200).json({ data: response });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  Shows,
};

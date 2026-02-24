const { BaseURL } = require("../util/baseurl");
const redis = require("../util/redis");

const Shows = async (req, res) => {
  const { movieSort, movieName } = req.body;

  try {
    if (!movieName) {
      const key = "show:popular";

      const cached = await redis.get(key);
      if (cached) {
        return res.status(200).json({ data: JSON.parse(cached) });
      }

      const headers = process.env.AUTH_TOKEN
        ? {
            accept: "application/json",
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          }
        : {
            accept: "application/json",
          };

      const popular = await fetch(
        `${BaseURL}/movie/popular?language=en-US&page=1`,
        {
          method: "GET",
          headers,
        },
      );
      const response = await popular.json();

      await redis.set(key, JSON.stringify(response), "EX", 60 * 60 * 24);

      return res.status(200).json({ data: response });
    } else {
      const key = `show:${movieName}:${movieSort}`;

      const cached = await redis.get(key);
      if (cached) {
        return res.status(200).json({ data: JSON.parse(cached) });
      }

      const query = encodeURIComponent(movieName);
      const headers = process.env.AUTH_TOKEN
        ? {
            accept: "application/json",
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          }
        : {
            accept: "application/json",
          };

      const info = await fetch(
        `${BaseURL}/search/${movieSort}?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers,
        },
      );

      const response = await info.json();

      await redis.set(key, JSON.stringify(response), "EX", 60 * 60 * 9);

      return res.status(200).json({ data: response });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  Shows,
};

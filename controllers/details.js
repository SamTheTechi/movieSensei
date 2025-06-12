const { BaseURL } = require("../util/baseurl");
const redis = require("../util/redis");

const Detail = async (req, res) => {
  const { id, type = "movie" } = req.body;
  console;

  if (!id) {
    return res.status(400).json({ error: "movieId is required" });
  }

  const key = `details:${id}`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      return res.status(200).json({ data: JSON.parse(cached) });
    }

    const [videoRes, dataRes] = await Promise.all([
      fetch(`${BaseURL}/${type}/${id}/videos?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }),
      fetch(`${BaseURL}/${type}/${id}?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }),
    ]);

    const videoResponse = await videoRes.json();
    const response = await dataRes.json();

    const object = {
      response,
      videoResponse,
    };

    await redis.set(key, JSON.stringify(object), "EX", 60 * 60 * 24);

    return res.status(201).json({
      data: object,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};

module.exports = {
  Detail,
};

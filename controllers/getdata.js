const { BaseURL } = require("../util/baseurl");

const Detail = async (req, res) => {
  const { id, type = "movie" } = req.query;

  if (!id) {
    return res.status(400).json({ error: "movieId is required" });
  }

  try {
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

    res.status(201).json({
      data: {
        response,
        videoResponse,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};

module.exports = {
  Detail,
};

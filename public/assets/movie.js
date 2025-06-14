document.addEventListener("DOMContentLoaded", async () => {
  const forms = document.querySelectorAll(`.form, .form2`);
  const poster = document.querySelector(".poster");
  const title = document.querySelector(".title");
  const yearOfRelease = document.querySelector(".yearOfrelease");
  const description = document.querySelector(".discription");
  const rating = document.querySelector(".rating");
  const videoBox = document.querySelector(".VideoBox");
  const body = document.querySelector(".Body");
  const videoPlay = document.querySelector(".VideoPlay");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const Userinput = document.querySelector(".form .Userinput").value;
      const select = document.querySelector(".form .selecter").value;
      window.location.href = `/?title=${Userinput}&type=${select}`;
    });
  });

  const BASE_YT_URL = "https://www.youtube.com/embed/";
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w342";

  const { id, type } = extractInfo();
  if (!id || !type) {
    console.error("Missing ID or type in URL.");
    return;
  }

  try {
    const response = await fetch("/api/v1/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, type }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch details");
    }

    const parsedData = await response.json();
    const responseData = parsedData?.data?.response || {};
    const videoResults = parsedData?.data?.videoResponse?.results || [];

    if (responseData.backdrop_path) {
      body.style.backgroundImage = `url(${BASE_IMG_URL + responseData.backdrop_path})`;
    }

    if (responseData.poster_path) {
      poster.src = BASE_IMG_URL + responseData.poster_path;
    }

    title.textContent = responseData.title || "No title available";

    yearOfRelease.textContent = responseData.release_date || "Unknown";

    description.textContent =
      responseData.overview || "No description available.";

    rating.textContent = responseData.vote_average
      ? `${responseData.vote_average}/10`
      : "No rating";

    const trailer = videoResults.find((v) => v.type === "Trailer");
    if (trailer) {
      videoBox.src = BASE_YT_URL + trailer.key;
    } else {
      videoPlay.style.display = "none";
    }
  } catch (e) {
    console.error("Could not load detail information:", e.message);
  }
});

function extractInfo() {
  const url = new URL(window.location.href);

  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  const type = url.searchParams.get("type");
  return { id, type };
}

// function HeaderPadding() {
//   const viewPortWidth = window.innerWidth;
//   if (viewPortWidth <= 600) {
//     headerBottomlayer.style.display = `none`;
//     Body.style.marginTop = `-6.1vh`;
//     SearchButton.addEventListener(`click`, () => {
//       if (headerBottomlayer.style.display === `none`) {
//         headerBottomlayer.style.display = `flex`;
//         Body.style.marginTop = `0vh`;
//       } else {
//         Body.style.marginTop = `-6.1vh`;
//         headerBottomlayer.style.display = `none`;
//       }
//     });
//   } else {
//     Body.style.marginTop = `0vh`;
//   }
// }
//
// HeaderPadding();
// window.addEventListener("resize", HeaderPadding);
//

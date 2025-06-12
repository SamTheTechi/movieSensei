const forms = document.querySelectorAll(`.form, .form2`);
const Bodywrap = document.querySelector(`.Bodywrap`);
const selectDOM = document.querySelector(`.selecter`);

// on initial load of html
document.addEventListener(`DOMContentLoaded`, async () => {
  const { title, type } = extractInfo();
  if (!title || !type) {
    await loadData("", "");
  } else {
    await loadData(`${title}`, `${type}`);
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const Userinput = document.querySelector(".form .Userinput").value;
      const select = document.querySelector(".form .selecter").value;
      window.location.href = `/?title=${Userinput}&type=${select}`;
    });
  });

  Bodywrap.addEventListener("click", async (event) => {
    const clickedMovieContainer = event.target.closest(".movieContainer");

    if (clickedMovieContainer) {
      const movieId = clickedMovieContainer.getAttribute("movie_id");
      const selected = selectDOM.value;

      try {
        window.location.href = `/details/${movieId}?type=${selected}`;
      } catch (error) {
        console.error(error);
      }
    }

    function HeaderPadding() {
      const viewPortWidth = window.innerWidth;
      if (viewPortWidth <= 600) {
        headerBottomlayer.style.display = `none`;
        Bodywrap.style.paddingTop = `0vh`;
        SearchButton.addEventListener(`click`, () => {
          // Toggle header visibility on small screens
          if (headerBottomlayer.style.display === `none`) {
            headerBottomlayer.style.display = `flex`;
            Bodywrap.style.paddingTop = `5vh`;
          } else {
            headerBottomlayer.style.display = `none`;
            Bodywrap.style.paddingTop = `0vh`;
          }
        });
      } else {
        Bodywrap.style.paddingTop = `14vh`;
      }
    }

    HeaderPadding();
    window.addEventListener("resize", HeaderPadding);
  });
});

// helper functions
async function loadData(userinput, select) {
  try {
    const res = await fetch("/api/v1/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieName: userinput,
        movieSort: select,
      }),
    });
    if (!res) {
      console.log("ERROR: can't connect to user");
    } else {
      let response = await res.json();
      let data = response.data.results;
      console.log(data);
      Bodywrap.innerHTML = ``;
      data.forEach((item) => {
        const imgElement = populateHtml(item);
        Bodywrap.append(imgElement);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function populateHtml(item) {
  const movieContainer = document.createElement(`div`);
  movieContainer.className = `movieContainer`;
  movieContainer.setAttribute(`movie_id`, item.id);

  const img = document.createElement(`img`);
  const baseImgURL = `https://image.tmdb.org/t/p/w342`;

  img.src = baseImgURL + item.poster_path;
  img.className = `ShowPoster`;
  img.alt = item.id;
  // Provide a fallback image
  img.onerror = function () {
    img.src = `${baseImgURL}/1ZuRLgQGPG6K5fcORJQpsmIurZv.jpg`;
  };

  const imgDiv = document.createElement(`div`);
  imgDiv.className = `imageDiv`;

  const imgDescription = document.createElement(`div`);
  imgDescription.className = `imgDescription`;

  const title = document.createElement(`div`);
  title.className = `title`;
  title.textContent = item.name || item.title;

  imgDescription.appendChild(title);
  imgDiv.appendChild(img);
  movieContainer.appendChild(imgDiv);
  movieContainer.appendChild(imgDescription);

  return movieContainer;
}

function extractInfo() {
  const url = new URL(window.location.href);

  const title = url.searchParams.get("title");
  const type = url.searchParams.get("type");

  return { title, type };
}

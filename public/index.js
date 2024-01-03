document.addEventListener(`DOMContentLoaded`, async () => {
  const formDOM = document.querySelector(`.form`);
  const form2DOM = document.querySelector(`.form2`);
  const headerBottomlayer = document.querySelector(`.headerBottomlayer`);
  const Bodywrap = document.querySelector(`.Bodywrap`);
  const MovieSlider = document.querySelector(`.MovieSlider`);
  const UserinputDOM = document.querySelector(`.Userinput`);
  const selectDOM = document.querySelector(`.selecter`);
  const SearchButton = document.querySelector(`.SearchButton`);

  fetchData(Bodywrap, MovieSlider)
  
  formDOM.addEventListener('submit', handleFormSubmit);
  form2DOM.addEventListener('submit', handleFormSubmit2);
  
  async function handleFormSubmit(event) {
    event.preventDefault();
    const UserinputDOM = document.querySelector('.form .Userinput');
    const selectDOM = document.querySelector('.form .selecter');
    const Userinput = UserinputDOM.value;
    const selected = selectDOM.value;
  
    try {
      const response = await axios.post('/api/v1/endpoint/recivedValue', {
        search: Userinput,
        select: selected,
      });
      if (!response.ok) {
        console.log('ERROR: can\'t connect to user');
      }
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormSubmit2(event) {
    event.preventDefault();
    const UserinputDOM = document.querySelector('.form2 .Userinput');
    const selectDOM = document.querySelector('.form2 .selecter');
    const Userinput = UserinputDOM.value;
    const selected = selectDOM.value;
  
    try {
      const response = await axios.post('/api/v1/endpoint/recivedValue', {
        search: Userinput,
        select: selected,
      });
      if (!response.ok) {
        console.log(`ERROR: can't connect to user`);
      }
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }
  

  Bodywrap.addEventListener('click', async (event) => {
    const clickedMovieContainer = event.target.closest('.movieContainer');

    if (clickedMovieContainer) {
      const movieId = clickedMovieContainer.getAttribute('movie-id');
      const media_type = clickedMovieContainer.getAttribute(`media_type`)
      const selected = selectDOM.value;

      try{
        const response = await axios.post(`/api/v1/endpoint/selectedMovieID`,{
          movieId: movieId,
          mediaType: media_type,
          select: selected,
        });
        if(!response.ok){
          console.log(`ERROR:can't conncet to user`)
        }
        window.location.href = '/details';
      }catch(error){
        console.error(error)
      }
    }
  });

  function HeaderPadding(){
    const viewPortWidth = window.innerWidth;
    if(viewPortWidth <= 600){
      headerBottomlayer.style.display = `none`;
      Bodywrap.style.paddingTop = `0vh` ;
      SearchButton.addEventListener(`click`,() => {
        if(headerBottomlayer.style.display === `none`){
          headerBottomlayer.style.display = `flex`;
          Bodywrap.style.paddingTop = `5vh`;
        } else {
          headerBottomlayer.style.display = `none`;
          Bodywrap.style.paddingTop = `0vh` ;
        }
      });
    } else {
      Bodywrap.style.paddingTop = `14vh`;
    }
  } 

  HeaderPadding();
  window.addEventListener('resize', HeaderPadding);

});


async function fetchData(Bodywrap, MovieSlider) {
  try {
    const request = await axios.get(`/api/v1/endpoint/data`);
    const parsedData = request.data;
    let searchResults = parsedData.Data.response.results;

    
    Bodywrap.innerHTML = ``;

    searchResults.forEach(item =>{
      const imgElement = populateHtml(item);
      Bodywrap.append(imgElement);
    })
    
  } catch (error) {
    console.log(error);
  }
}


function populateHtml(item){
  const movieContainer = document.createElement(`div`);
  movieContainer.className = `movieContainer`;
  movieContainer.setAttribute(`movie-id`, item.id)
  movieContainer.setAttribute(`media_type`,item.media_type)
  

  const img = document.createElement(`img`);
  const baseImgURL = `https://image.tmdb.org/t/p/w342`

  img.src = baseImgURL+item.poster_path;
  img.className = `ShowPoster`
  img.alt = item.id;
  img.onerror = function(){
    img.src=(`${baseImgURL}/1ZuRLgQGPG6K5fcORJQpsmIurZv.jpg`)
  } 

  const imgDiv = document.createElement(`div`);
  imgDiv.className = `imageDiv`

  const rating = document.createElement(`div`);
  rating.className = `rating`

  const imgDescription = document.createElement(`div`);
  imgDescription.className = `imgDescription`

  const title = document.createElement(`div`);
  title.className = `title`;
  title.textContent = item.name || item.title;


  imgDescription.appendChild(title);
  imgDiv.appendChild(img);
  imgDiv.appendChild(rating)
  movieContainer.appendChild(imgDiv);
  movieContainer.appendChild(imgDescription);

  return movieContainer;
}


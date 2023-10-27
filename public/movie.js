document.addEventListener(`DOMContentLoaded`, async()=>{
  const poster = document.querySelector(`.poster`);
  const title = document.querySelector(`.title`);
  const yearOfrelease = document.querySelector(`.yearOfrelease`);
  const discription = document.querySelector(`.discription`) ;
  const rating = document.querySelector(`.rating`);
  const genres = document.querySelector(`.genres`);
  const videoBox = document.querySelector(`.VideoBox`);
  const formDOM = document.querySelector(`.form`);
  const Body = document.querySelector(`.Body`);
  const VideoPlay = document.querySelector(`.VideoPlay`)
  const form2DOM = document.querySelector(`.form2`);
  const SearchButton = document.querySelector(`.SearchButton`);
  const headerBottomlayer = document.querySelector(`.headerBottomlayer`);


  const BaseYTURL = `https://www.youtube.com/embed/`
  const baseImgURL = `https://image.tmdb.org/t/p/w342`
  
    const request = await axios.get(`/api/v1/endpoint/MovieData`);
    const parsedData = request.data;
    
    const backDrop = baseImgURL+parsedData.AllResponse.response.backdrop_path;
    Body.style.backgroundImage = `url(${backDrop})`

    const Poster = baseImgURL+parsedData.AllResponse.response.poster_path;
    poster.src = Poster;

    const Title = parsedData.AllResponse.response.title
    title.innerHTML = Title
    
    const YearOfrelease = parsedData.AllResponse.response.release_date
    yearOfrelease.innerHTML = YearOfrelease


    const Discription = parsedData.AllResponse.response.overview
    discription.innerHTML = Discription 

    const Rating = parsedData.AllResponse.response.vote_average
    rating.innerHTML = Rating+`/10`

    const firstTrailer = parsedData.AllResponse.videoResponse.results.find(video => video.type === "Trailer");
    if(firstTrailer){
      Trailer = BaseYTURL+firstTrailer.key;
      videoBox.src = Trailer
    } else{ 
      VideoPlay.style.display = `none`;
    }


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
      console.log('ERROR: can\'t connect to user');
    }
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
}

    function HeaderPadding(){
      const viewPortWidth = window.innerWidth;
      if(viewPortWidth <= 600){
        headerBottomlayer.style.display = `none`;
        Body.style.marginTop = `-6.1vh`;
        SearchButton.addEventListener(`click`,() => {
          if(headerBottomlayer.style.display === `none`){
            headerBottomlayer.style.display = `flex`;
            Body.style.marginTop = `0vh`;
          } else {
            Body.style.marginTop = `-6.1vh`;
            headerBottomlayer.style.display = `none`;
          }
        });
      } else {
        Body.style.marginTop = `0vh`;
      }
    } 
  
    HeaderPadding();
    window.addEventListener('resize', HeaderPadding);
  
  })

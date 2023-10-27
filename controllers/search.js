const { StatusCodes } = require(`http-status-codes`);
const { BadRequestError } = require(`../errors`)
const BaseURL = (`https://api.themoviedb.org/3/search`)
require(`dotenv`).config();

let movieName = '';
let movieSort = '';

const option = {headers: {
    accept: 'application/json',
    Authorization: process.env.AUTH_TOKEN,
  },
} 

const FrontRecivedValue = async (req, res) => {
    movieName = req.body.search;
    movieSort = req.body.select;
    console.log(`${movieName} ${movieSort}`);
    res.status(StatusCodes.OK).send(`MOVEI:${movieName}  &  TYPE: ${movieSort}`);
}

const APIValue = async (req, res) => {
    if (movieName == '') {
        // let upComming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, option);
        let popular = await fetch (`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,option);
        const response = await popular.json();
        // const UpComming = await upComming.json();
        const Data = {
            response,
            // UpComming,
        }
        res.status(StatusCodes.OK).json({Data});          

    } else {
        let MovieName = movieName.split(` `).join(`%20`);
        let Info = await fetch (`${BaseURL}/${movieSort}?query=${MovieName}&include_adult=false&language=en-US&page=1`,option);;
        const response = await Info.json();
        const Data = {
            response,
        }
        res.status(StatusCodes.OK).json({Data});
    }
};


module.exports ={
    FrontRecivedValue,
    APIValue,
}




 


// const APIValue = async (req,res) => {
//     let Data;
//     if(movieSort === `All`){
//         Data = await fetch (`http://www.omdbapi.com/?apikey=5c989060&s=${movieName}`);
//     }
//     else{
//         Data = await fetch (`http://www.omdbapi.com/?apikey=5c989060&s=${movieName}&type=${movieSort}`);
//     }
//     const response = await Data.json();
//     res.status(StatusCodes.OK).json({response});
// }
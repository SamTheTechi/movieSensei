const { StatusCodes } = require("http-status-codes")
require(`dotenv`).config()
const BaseURL = (`https://api.themoviedb.org/3`)

let MovieID = ``;
let MediaType = ``;

const option = {headers: {
    accept: 'application/json',
    Authorization: process.env.AUTH_TOKEN,
  },
} 

const RecivedValue = async (req,res) => {
    MovieID = req.body.movieId;
    MediaType = req.body.mediaType;
    MovieSort = req.body.select;
    if(MovieSort == `movie`){
        MediaType = `movie`
    }else if(MovieSort == `tv`){
        MediaType = `tv`
    }else{
        if(MediaType == `undefined`){
            MediaType = `movie`
        }
        else{
            MediaType = MediaType
        }
    }
    console.log(`${MovieID} + ${MediaType}`);
    res.status(StatusCodes.OK).send(MovieID);
}

const MovieDetail = async(req,res) => {
    let video = await fetch(`${BaseURL}/${MediaType}/${MovieID}/videos?language=en-US`, option)
    let data = await fetch(`${BaseURL}/${MediaType}/${MovieID}?language=en-US`,option)
    const response = await data.json();
    const videoResponse = await video.json();
    const AllResponse = {
        response,
        videoResponse,
    }
    res.status(StatusCodes.OK).json({AllResponse});
}
module.exports = {
    RecivedValue,
    MovieDetail,
}
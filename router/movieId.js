const express = require(`express`);
const router = express.Router();

const { 
    MovieDetail,
    RecivedValue,
} = require(`../controllers/movieId`);

router.route(`/selectedMovieID`).post(RecivedValue)
router.route(`/MovieData`).get(MovieDetail)



module.exports = router
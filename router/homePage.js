const express = require(`express`);
const router = express.Router();

const {
    HomePage,
    MovieDetailPage,
} = require(`../controllers/homePage`)

router.route(`/details`).get(MovieDetailPage)
router.route(`/`).get(HomePage)

module.exports = router;

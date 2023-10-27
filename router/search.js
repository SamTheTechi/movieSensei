const express = require(`express`);
const router = express.Router();

const {
    FrontRecivedValue,
    APIValue,
} = require(`../controllers/search`);

router.route(`/recivedValue`).post(FrontRecivedValue);
router.route(`/data`).get(APIValue);

module.exports = router
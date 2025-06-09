const express = require("express");
const router = express.Router();
const { Home, Detail } = require("../controllers/static");

router.get("/", Home);
router.get("/details", Detail);

module.exports = router;

const express = require("express");
const router = express.Router();
const { Shows } = require("../controllers/shows");
const { Detail } = require("../controllers/details");

router.post("/details", Detail);
router.post("/shows", Shows);

module.exports = router;

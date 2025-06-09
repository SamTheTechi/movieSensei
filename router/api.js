const express = require("express");
const router = express.Router();
const { Shows } = require("../controllers/search");
const { Detail } = require("../controllers/getdata");

router.get("/details", Detail);
router.post("/shows", Shows);

module.exports = router;

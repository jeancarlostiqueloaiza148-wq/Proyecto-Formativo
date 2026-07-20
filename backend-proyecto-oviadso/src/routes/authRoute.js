const express = require("express");
const router = express.Router();


//import controller
const {login} = require("../controllers/authController");

router.post("/login", login);

module.exports = router;
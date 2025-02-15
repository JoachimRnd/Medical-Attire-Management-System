const express = require('express');

const Room = require("../models/Room");
const { query, validationResult } = require("express-validator");

const router = express.Router();


router.get('/all', async (req, res) => {
    let resObj = await new Room().getAllRooms();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;

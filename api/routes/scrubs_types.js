const express = require('express');
const { query, body, validationResult } = require('express-validator');

const ScrubType = require("../models/ScrubType");

const router = express.Router();

router.get('/', [
    query('id_scrub_type').isInt(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let resObj = await new ScrubType(req.query.id_scrub_type).getScrubType();
    return res.status(resObj.status).json(resObj.response);
});

router.get('/all', async (req, res) => {
    let resObj = await new ScrubType().getAllScrubTypes();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;

const express = require('express');
const { query, body, validationResult } = require('express-validator');

const Scrub = require("../models/Scrub");

const router = express.Router();


router.get('/overdue', [
    query('id_employee')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let resObj = await new Scrub(
        null, null, null, null, null
    ).getAllOverdueScrubsByEmployee(req.query.id_employee);
    return res.status(resObj.status).json(resObj.response);
});

router.get('/borrowed/currently', [
    query('id_employee')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let resObj = await new Scrub(
        null, null, null, null, null
    ).getAllCurrentlyBorrowedScrubsByEmployee(req.query.id_employee);
    return res.status(resObj.status).json(resObj.response);
});

router.get('/borrowed/details', [
    query('id_history')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let resObj = await new Scrub(
        null, null, null, null, null
    ).getDetailsBorrowedScrubItem(req.query.id_history);
    return res.status(resObj.status).json(resObj.response);
});

router.post('/borrow', [
    body('borrowed_date')
        .isDate({ format: 'YYYY-MM-DD' }),
    body('return_date')
        .isDate({ format: 'YYYY-MM-DD' }),
    body('id_scrub_type')
        .isInt({ min: 1 }),
    body('id_employee')
        .isInt({ min: 1 }),
    body('id_given_by')
        .isInt({ min: 1 }),
    body('quantity')
        .isInt({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Scrub(
        null, true, obj.borrowed_date, obj.return_date, obj.id_scrub_type)
        .employeeBorrowsScrubs(obj.quantity, obj.id_employee, obj.id_given_by);
    return res.status(resObj.status).json(resObj.response);
});

router.post('/return', [
    body('id_history')
        .isInt({ min: 1 }),
    body('quantity')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Scrub().employeeReturnsScrubs(obj.id_history, obj.quantity);
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;

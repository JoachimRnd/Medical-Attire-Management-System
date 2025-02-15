const express = require('express');
const { query, body, validationResult } = require('express-validator');

const Employee = require("../models/Employee");


const router = express.Router();

router.get('/', [
    query('id').isInt(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let resObj = await new Employee(req.query.id).getEmployee();
    return res.status(resObj.status).json(resObj.response);
});

router.get('/all', async (req, res) => {
    let resObj = await new Employee().getAllEmployees();
    resObj.response.map(e => delete e.password);
    return res.status(resObj.status).json(resObj.response);
});

router.get('/withBorrowings', [
    query('id').isInt(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let resObj = await new Employee(req.query.id).getEmployeeWithBorrowings();
    return res.status(resObj.status).json(resObj.response);
});

router.post('/', [
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('name')
        .not().isEmpty(),
    body('profession')
        .not().isEmpty(),
    body('gender')
        .not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    let resObj = await new Employee(
        null, obj.email, null, obj.name, obj.profession, obj.gender,
        obj.shoe_preference, obj.top_preference, obj.bottom_preference, obj.gloves_preference
    ).insertEmployee();
    return res.status(resObj.status).json(resObj.response);
});

router.post('/login', [
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Employee(null, obj.email, obj.password).login();
    return res.status(resObj.status).json(resObj.response);
});

router.put('/preferences', [
    body('shoe_preference')
        .isInt({ min: 1 }),
    body('top_preference')
        .not().isEmpty(),
    body('bottom_preference')
        .not().isEmpty(),
    body('gloves_preference')
        .not().isEmpty(),
    body('id_employee')
        .isInt({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Employee(
        obj.id_employee, null, null, null, null, null,
        obj.shoe_preference, obj.top_preference, obj.bottom_preference, obj.gloves_preference,
    ).updatePreferences();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;

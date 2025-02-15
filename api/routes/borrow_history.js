const express = require('express');

const BorrowHistory = require('../models/BorrowHistory');
const { query, validationResult } = require("express-validator");

const router = express.Router();

router.get('/', async (req, res) => {
    const obj = await new BorrowHistory().getAllBorrowHistory();
    return res.status(obj.status).json(obj.response);
})

router.get('/fromEmployee', [
    query('id')
        .isInt({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = await new BorrowHistory().getBorrowHistoryFromEmployee(req.query.id);
    if (obj.status === 200) {
        obj.response = obj.response.map(o => {
            const borrowed_date = new Date(o.borrowed_date);
            const returnBy = new Date(o.return_by);

            let status = "borrowed";
            if (o.completely_returned) status = "returned";
            else if (new Date(returnBy) < new Date()) status = "overdue";

            if (o.status) status = o.status;

            return {
                type: o.description,
                size: o.size,
                color: o.color,
                amount: o.quantity,
                gender: o.gender,
                borrowDate: borrowed_date.toLocaleDateString(),
                givenBy: o.name,
                returnBy: returnBy.toLocaleDateString(),
                status: status,
                id_history: o.id_history
            };
        });
    }
    return res.status(obj.status).json(obj.response);
});

module.exports = router;

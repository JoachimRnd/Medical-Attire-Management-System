"use strict";

const query = require("../helper/query");

class BorrowHistory {
    constructor(id_history, quantity, borrowed_date, return_by, completely_returned, id_employee, id_given_by, id_room) {
        this.id_history = id_history;
        this.quantity = quantity;
        this.borrowed_date = borrowed_date;
        this.return_by = return_by;
        this.completely_returned = completely_returned;
        this.id_employee = id_employee;
        this.id_given_by = id_given_by;
        this.id_room = id_room;
    };

    getAllBorrowHistory = async () => await query(
        "Get * From borrow_history",
        "SELECT * FROM borrow_history",
        []
    );


    getBorrowHistoryFromEmployee = async id => {
        let resObj = await query(
            'Get * borrow history from distinct employee',
            'SELECT id_history, quantity, bh.borrowed_date, return_by, completely_returned, ' +
            'description, size, color, scrub_type.gender, name ' +
            'FROM scrub_borrow_history ' +
            'JOIN borrow_history bh USING(id_history) ' +
            'JOIN scrub USING(id_scrub) ' +
            'JOIN scrub_type USING(id_scrub_type)' +
            'JOIN employee giver ON giver.id_employee = id_given_by ' +
            'WHERE bh.id_employee = $1 ' +
            'GROUP BY id_history, quantity, bh.borrowed_date, return_by, completely_returned, ' +
            'description, size, color, scrub_type.gender, name',
            [id]
        );

        if (resObj.status !== 200) {
            return resObj;
        }

        let reportRes = await this.getReportedSumForEachBorrowHistory();
        if (reportRes.status !== 200) {
            console.log("report error");
            console.log(reportRes);
        }

        let returnRes = await this.getReturnHistoryForEachBorrowHistory();
        if (returnRes.status !== 200) {
            console.log("return error");
            console.log(returnRes);
        }

        let history = [];

        await Promise.all(resObj.response.map(async h => {
            let reportHistory = reportRes.response.filter(r => r.id_history === h.id_history);
            if (reportHistory.length > 0) {
                let reportedSum = reportHistory[0].reported;
                h.quantity -= reportedSum;
            }

            returnRes.response
                .filter(r => r.id_history === h.id_history)
                .forEach(returnHistory => {
                    const qty = returnHistory.quantity;
                    h.quantity -= qty;
                    returnHistory.status = "returned";
                    history.push(returnHistory);
                });

            if (h.quantity > 0) {
                return h;
            }
            return {};
        })).then(res => resObj.response = res.filter(value => Object.keys(value).length !== 0).concat(history));

        return resObj;
    };

    getReportedSumForEachBorrowHistory = async () => await query(
        'Get sum of reported scrubs of each distinct borrow history',
        'SELECT COUNT(*) AS reported, id_history FROM borrow_history ' +
        'JOIN scrub_borrow_history USING(id_history) ' +
        'JOIN report USING(id_scrub) ' +
        'GROUP BY id_history;',
        []
    );

    getReturnHistoryForEachBorrowHistory = async () => await query(
        'Get * return history from each distinct borrow history',
        'SELECT id_history, count(id_scrub) as quantity, bh.borrowed_date, return_by, completely_returned, ' +
        'description, size, color, scrub_type.gender, name ' +
        'FROM scrub_borrow_history sbh ' +
        'JOIN borrow_history bh USING(id_history) ' +
        'JOIN scrub USING(id_scrub) ' +
        'JOIN scrub_type USING(id_scrub_type)' +
        'JOIN employee giver ON giver.id_employee = id_given_by ' +
        'WHERE returned = TRUE ' +
        'GROUP BY id_history, sbh.returned_date, bh.borrowed_date, return_by, completely_returned, ' +
        'description, size, color, scrub_type.gender, name',
        []
    );

    insertBorrowHistory = async () => await query(
        'Insert new borrowed history',
        'INSERT INTO borrow_history (quantity, borrowed_date, return_by, completely_returned, id_employee, id_given_by, id_room) ' +
        'VALUES ($1, $2, $3, FALSE, $4, $5, $6) RETURNING *',
        [this.quantity, this.borrowed_date, this.return_by, this.id_employee, this.id_given_by, this.id_room]
    );

    updateBorrowHistory = async () => await query(
        'Update borrow history -> returned completely',
        'UPDATE borrow_history SET completely_returned = TRUE where id_history = $1',
        [this.id_history]
    );
}

module.exports = BorrowHistory;

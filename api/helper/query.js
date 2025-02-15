const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');

const query = async (name, sql, v) => {
    const stmt = new PS({
        name: name,
        text: sql,
        values: v
    });

    let res = {
        status: 500,
        response: "Internal Error"
    };
    await db.any(stmt)
        .then(data => {
            res = {
                status: 200,
                response: data
            };
        })
        .catch(err => {
            res = {
                status: 400,
                response: err
            };
        });
    return res;
};

module.exports = query;

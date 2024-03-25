const db = require('./db');
const config = require('../config');

async function get() {
    const rows = await db.query(
        `SELECT * FROM finance_amounts`
    );
    return rows || [];
}

async function add({ description, user_id, amount }) {
    const res = await db.query(
        `INSERT INTO finance_amounts(user_id, amount, description, status, date_create, date_change, date_delete)
    VALUES(${user_id}, ${amount}, '${description}', '0', now(), '0000-00-00 00:00:00', '0000-00-00 00:00:00');`
    );
    return res;
}

async function change({ id, status, amount, description }) {
    const res = await db.query(
        `UPDATE finance_amounts SET
    ${amount ? `amount='${amount}',` : ''}
    ${description ? `description='${description}',` : ''}
    status = '${status || 0}',
    date_delete = ${status === 1 ? 'now()' : "'0000-00-00 00:00:00',"}
    ${status === 1 ? '' : 'date_change = now()'}
    WHERE id = '${id}';`
    );
    return res
}

module.exports = {
    get, add, change
}
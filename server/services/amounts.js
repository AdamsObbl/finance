const db = require('./db');
const config = require('../config');

async function get() {
    const rows = await db.query(
        `SELECT * FROM finance_amounts`
    );
    return rows || [];
}

async function getLast({ user_id }) {

    const rows = await db.query(
        `SELECT * FROM finance_amounts
        WHERE user_id = ${user_id}
        AND status = 1
        ORDER BY date_delete DESC
        limit 1;
        `
    );
    return rows || [];
}

async function add({ description, user_id, amount }) {
    const [res] = await db.query(
        `INSERT INTO finance_amounts(user_id, amount, description, status, date_create, date_change, date_delete)
    VALUES(${user_id}, ${amount}, '${description}', '0', now(), '0000-00-00 00:00:00', '0000-00-00 00:00:00')
    RETURNING id;`
    );
    return res.id;
}

async function change({ id, status, amount, description }) {
    const query =
        `UPDATE finance_amounts SET
        ${amount ? `amount='${amount}',` : ''}
        ${description ? `description='${description}',` : ''}
        status = '${status || 0}',
        date_delete = ${status === 1 ? 'now()' : "'0000-00-00 00:00:00',"}
        ${status === 1 ? '' : 'date_change = now()'}
        WHERE id = '${id}';`;
    const res = await db.query(query);
    return res;
}

module.exports = {
    get, add, change, getLast
}
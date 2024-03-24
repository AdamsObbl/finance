const db = require('./db');
const config = require('../config');

async function get() {
  const rows = await db.query(
    `SELECT id, name, date_create, status, date_change, date_delete
        FROM finance_users`
  );
  return rows || [];
}

async function add({ name }) {
  const res = await db.query(
    `INSERT INTO finance_users (name, status, date_create, date_change, date_delete)
    VALUES ('${name}', '0', now(), now(), '0000-00-00 00:00:00');`
  );
  return res;
}

async function change({ id, status, name }) {
  const res = await db.query(
    `UPDATE finance_users SET
    ${name?`name='${name}'`:''}
    status = '${status||0}',
    date_delete = ${status===1?'now()':'0000-00-00 00:00:00'}
    ${status===1?'':'date_change = now()'}
    WHERE id = '${id}';`
  );
  return res
}

module.exports = {
  get, add, change
}
const mysql=require("mysql2/promise"),config=require("../config");async function query(e,n){const r=await mysql.createConnection(config.db),[o]=await r.execute(e,n);return o}module.exports={query:query};
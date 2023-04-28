const Pool = require('pg').Pool
const pool = new Pool({
    user: "hdpknlyt",
    password: "JAv_pbayb_kDbBorhhfRp8Ddb11vePpU",
    host: "dumbo.db.elephantsql.com",
    port: 5432,
    database: "hdpknlyt"
})

module.exports = pool







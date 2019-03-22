let pgp = null;
let db = null;

if (!pgp) {
    pgp = require('pg-promise')({});  
    db = pgp(process.env.DATABASE_URL || 'postgres://localhost/butter'); 
}

module.exports = {db}
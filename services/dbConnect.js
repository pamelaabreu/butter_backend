let pgp = null;
let db = null;

if (!pgp) {
    pgp = require('pg-promise')({});  
    db = pgp('postgres://localhost/pokemon'); 
}

module.exports = {db}
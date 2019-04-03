const {db} = require('./dbConnect');
const LoginService = {};

LoginService.read = (firebase_uid) => {
    const sql = `
    SELECT users.id
    FROM users
    WHERE
        users.firebase_uid = $[firebase_uid]
    `;
    
    return db.one(sql, { firebase_uid });
};

module.exports = LoginService;
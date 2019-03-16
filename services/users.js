const {db} = require('./dbConnect');
const UserService = {};

UserService.create = (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number) => {
    const sql = `
    INSERT INTO users (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number) VALUES
    ($[birthname], $[username], $[email], $[firebase_uid], $[profile_img], $[birthday], $[joining_reason], $[followers_number], $[followings_number]);`;

    return db.one(sql, {birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number});
}

UserService.read = (id) => {
    const sql = `
    SELECT
        users.*
    FROM users
    WHERE
        users.id = $[id]
    `;

    return db.one(sql, {id})
}


module.exports = UserService;
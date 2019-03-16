const {db} = require('./dbConnect');
const UserService = {};

// POST - CREATE
UserService.create = (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number) => {
    const sql = `
    INSERT INTO users (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number) VALUES
    ($[birthname], $[username], $[email], $[firebase_uid], $[profile_img], $[birthday], $[joining_reason], $[followers_number], $[followings_number]);`;

    return db.one(sql, {birthname, username, email, firebase_uid, profile_img, birthday, joining_reason, followers_number, followings_number});
}



module.exports = UserService;
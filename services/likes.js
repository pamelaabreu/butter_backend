const {db} = require('./dbConnect');
const LikeService = {};

LikeService.create = (user_like_id, post_like_id) => {
    const sql = `
    INSERT INTO likes (user_like_id, post_like_id) VALUES
    ($[user_like_id], $[post_like_id]);`;

    return db.one(sql, { user_like_id, post_like_id });
};


module.exports = LikeService;
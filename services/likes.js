const {db} = require('./dbConnect');
const LikeService = {};

LikeService.create = (user_like_id, post_like_id) => {
    const sql = `
    INSERT INTO likes (user_like_id, post_like_id) VALUES
    ($[user_like_id], $[post_like_id]);`;

    return db.one(sql, { user_like_id, post_like_id });
};

LikeService.read = (id) => {
    const sql = `
    SELECT
        likes.*
    FROM likes
    WHERE
        likes.id = $[id]
    `;

    return db.one(sql, { id });
};

LikeService.update = (id, user_like_id, post_like_id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE likes
    SET
        updated_at = $[updated_at],
        user_like_id = $[user_like_id],
        post_like_id = $[post_like_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, updated_at, user_like_id, post_like_id });
};

LikeService.delete = (id) => {
    const sql = `
    DELETE FROM likes WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

module.exports = LikeService;
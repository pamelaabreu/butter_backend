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

LikeService.readAllLikes = (id) => {
    const sql = `
    SELECT 
        likes.*
    FROM likes
    WHERE
        likes.post_like_id = $[id]
    `;
    return db.any(sql, {id});
};

LikeService.updateLikes = (id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE posts
    SET
        updated_at = $[updated_at],
        likes = $[likes_number]
    WHERE
        id = $[id]
    `;

    return LikeService.readAllLikes(id)
    .then(data => {
        const likes_number = data.length;
        return db.none(sql, { id, updated_at, likes_number });
    })
    .catch(err => console.log(err))
};

LikeService.countLikes = (id) => {
    const sql = `
    SELECT COUNT (post_like_id)
    FROM posts
    WHERE post_like_id = $[id];
    `;

    db.any(sql, { id })
};

module.exports = LikeService;
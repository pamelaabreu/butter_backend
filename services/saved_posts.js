const {db} = require('./dbConnect');
const SavedPostService = {};

SavedPostService.create = (user_saved_id, post_saved_id) => {
    const sql = `
    INSERT INTO saved_posts (user_saved_id, post_saved_id) VALUES
    ($[user_saved_id], $[post_saved_id]);`;

    return db.one(sql, { user_saved_id, post_saved_id });
};

SavedPostService.read = (id) => {
    const sql = `
    SELECT
        saved_posts.*
    FROM saved_posts
    WHERE
        saved_posts.id = $[id]
    `;

    return db.one(sql, { id });
};

SavedPostService.update = (id, user_saved_id, post_saved_id) => {
    const sql = `
    UPDATE saved_posts
    SET
        user_saved_id = $[user_saved_id],
        post_saved_id = $[post_saved_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, user_saved_id, post_saved_id });
};

SavedPostService.delete = (id) => {
    const sql = `
    DELETE FROM saved_posts WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

SavedPostService.readAllSavedPosts = (id) => {
    const sql = `
    SELECT
        saved_posts.user_saved_id,
        saved_posts.post_saved_id,
        posts.id AS posts_id,
        posts.tag_id,
        posts.content_url,
        posts.title,
        posts.summary,
        posts.caption,
        posts.likes,
        posts.comments
    FROM saved_posts
    JOIN posts
        ON saved_posts.post_saved_id = posts.id
    WHERE
        saved_posts.user_saved_id = $[id]
    `;
    return db.any(sql, {id});
}

module.exports = SavedPostService;
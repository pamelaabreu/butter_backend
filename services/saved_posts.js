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
    const updated_at = Date.now();
    const sql = `
    UPDATE saved_posts
    SET
        updated_at = $[updated_at],
        user_saved_id = $[user_saved_id],
        post_saved_id = $[post_saved_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, updated_at, user_saved_id, post_saved_id });
};

SavedPostService.delete = (id) => {
    const sql = `
    DELETE FROM saved_posts WHERE id=$[id]
    `;

    return db.none(sql, { id });
};


module.exports = SavedPostService;